import { definePluginSettings } from "@api/Settings";
import { managedStyleRootNode } from "@api/Styles";
import { Devs } from "@utils/constants";
import { createAndAppendStyle } from "@utils/css";
import definePlugin, { OptionType } from "@utils/types";

type MentionFlagPreset = "none" | "disabled" | "bi" | "pan" | "trans" | "lesbian" | "nonbinary" | "asexual" | "rainbow" | "femboy";

let style: HTMLStyleElement | null = null;


function getMentionGradients(preset: MentionFlagPreset) {
    switch (preset) {
        case "pan":
            return {
                background: "linear-gradient(100deg, rgba(255, 27, 141, 0.24) 0%, rgba(255, 27, 141, 0.24) 34%, rgba(255, 218, 0, 0.2) 50%, rgba(26, 179, 255, 0.24) 66%, rgba(26, 179, 255, 0.24) 100%)",
                bar: "linear-gradient(180deg, #ff1b8d 0%, #ffda00 50%, #1ab3ff 100%)"
            };

        case "trans":
            return {
                background: "linear-gradient(100deg, rgba(91, 206, 250, 0.24) 0%, rgba(245, 169, 184, 0.2) 25%, rgba(255, 255, 255, 0.18) 50%, rgba(245, 169, 184, 0.2) 75%, rgba(91, 206, 250, 0.24) 100%)",
                bar: "linear-gradient(180deg, #5bcefa 0%, #f5a9b8 25%, #ffffff 50%, #f5a9b8 75%, #5bcefa 100%)"
            };
        case "lesbian":
            return {
                background: "linear-gradient(100deg, rgba(213, 45, 0, 0.24) 0%, rgba(239, 118, 39, 0.22) 25%, rgba(255, 154, 86, 0.2) 42%, rgba(181, 86, 144, 0.2) 58%, rgba(163, 2, 98, 0.24) 78%, rgba(163, 2, 98, 0.24) 100%)",
                bar: "linear-gradient(180deg, #d52d00 0%, #ef7627 25%, #ff9a56 42%, #d162a4 58%, #b55690 72%, #a30262 100%)"
            };
        case "nonbinary":
            return {
                background: "linear-gradient(100deg, rgba(252, 244, 52, 0.24) 0%, rgba(252, 244, 52, 0.24) 30%, rgba(252, 252, 252, 0.2) 50%, rgba(156, 89, 209, 0.22) 70%, rgba(45, 45, 45, 0.26) 100%)",
                bar: "linear-gradient(180deg, #fcf434 0%, #fcfcfc 33%, #9c59d1 66%, #2d2d2d 100%)"
            };
        case "asexual":
            return {
                background: "linear-gradient(100deg, rgba(18, 18, 18, 0.26) 0%, rgba(163, 163, 163, 0.2) 35%, rgba(255, 255, 255, 0.18) 50%, rgba(128, 0, 128, 0.24) 75%, rgba(128, 0, 128, 0.24) 100%)",
                bar: "linear-gradient(180deg, #121212 0%, #a3a3a3 33%, #ffffff 66%, #800080 100%)"
            };
        case "rainbow":
            return {
                background: "linear-gradient(100deg, rgba(229, 0, 0, 0.24) 0%, rgba(255, 141, 0, 0.22) 16%, rgba(255, 238, 0, 0.2) 33%, rgba(2, 129, 33, 0.2) 50%, rgba(0, 76, 255, 0.22) 66%, rgba(119, 0, 136, 0.24) 84%, rgba(119, 0, 136, 0.24) 100%)",
                bar: "linear-gradient(180deg, #e50000 0%, #ff8d00 16%, #ffee00 33%, #028121 50%, #004cff 66%, #770088 84%, #770088 100%)"
            };
        case "bi":
            return {
                background: "linear-gradient(100deg, rgba(214, 2, 112, 0.24) 0%, rgba(190, 42, 131, 0.24) 28%, rgba(155, 79, 150, 0.24) 50%, rgba(104, 71, 159, 0.24) 72%, rgba(0, 56, 168, 0.24) 100%)",
                bar: "linear-gradient(180deg, #d60270 0%, #bf2a83 30%, #9b4f96 50%, #68479f 72%, #0038a8 100%)"
            };

        case "femboy": {
            return {
                background: "linear-gradient(100deg, rgba(212, 96, 167, 0.24) 0%, rgba(228, 173, 205, 0.24) 16.67%, rgba(255, 255, 255, 0.24) 33.33%, rgba(87, 206, 248, 0.24) 50%, rgba(255, 255, 255, 0.24) 66.67%, rgba(228, 173, 205, 0.24) 83.33%, rgba(212, 96, 167, 0.24) 100%)",
                bar: "linear-gradient(180deg, #d460a7 0%, #e4adcd 16.67%, #ffffff 33.33%, #57cef8 50%, #ffffff 66.67%, #e4adcd 83.33%, #d460a7 100%)"
            };
        }

        case "none":
        default:
            return {
                background: "none",
                bar: "none"
            };
    }
}

function buildCss() {
    const css: string[] = [];

    if (settings.store.hideAvatarDecorations) {
        css.push(`
/* Hide avatar decorations everywhere */
[class="avatarDecoration"],
[class*="avatarDecorationContainer"],
svg[class="avatarDecoration"],
img[class*="avatarDecoration"] {
    display: none !important;
}
`);
    }

    if (settings.store.scaleReadAllButton) {
        css.push(`
/* Fix display width of 'read all' button for notifications & unreads */
button.vc-text-btn-base.vc-text-btn-secondary.vc-ranb-button {
    scale: 0.8;
}
`);
    }

    if (settings.store.scaleFriendCount) {
        css.push(`
/* Fix display width of online friend count */
span#vc-friendcount {
    scale: 0.9;
}
`);
    }

    if (settings.store.smoothAnimations) {
        css.push(`
:root {
    --tbz-ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
    --tbz-ease-soft: cubic-bezier(0.25, 0.8, 0.25, 1);
    --tbz-dur-fast: 120ms;
    --tbz-dur-mid: 180ms;
    --tbz-dur-slow: 260ms;
    --tbz-scale-press: 0.98;
    --tbz-scale-hover: 1.015;
}

@keyframes tbz-fade-in-up {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes tbz-fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes tbz-pop-in {
    0% {
        opacity: 0;
        transform: scale(0.97);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes tbz-highlight-pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(88, 101, 242, 0.35);
    }
    100% {
        box-shadow: 0 0 0 10px rgba(88, 101, 242, 0);
    }
}

button,
a,
[role="button"],
[role="tab"],
[role="menuitem"],
input,
textarea,
select,
.clickable__972a0,
.button__201d5,
.item__48dda,
.containerDefault__29444,
.interactive__972a0,
.channel__972a0,
.membersWrap_c8ffbb,
.member__5d473,
.message_d5deea,
.listItem__650eb,
.wrapper__6e9f8,
.panels_c48ade,
.sidebarList_c48ade,
.chatContent_a7d72e,
.searchBar__35e86,
.search__49676,
.bar_c38106,
.tabBar__133bf,
.tabBar_d6f9e9,
.base_c48ade,
.contentRegionScroller__23e6b,
.container__133bf,
.standardSidebarView__23e6b,
.menu_c1e9c4,
.root__49fc1,
.layer_da8173,
.backdrop__78332,
.autocomplete__13533,
.messagesWrapper__36d07,
.scroller__36d07,
.scroller_c47fa9,
.peopleListItem_cc6179,
.container_c2739c,
.cardPrimary__73069,
.card__73069,
.visual-refresh {
    transition:
        transform var(--tbz-dur-mid) var(--tbz-ease-standard),
        opacity var(--tbz-dur-mid) var(--tbz-ease-soft),
        background-color var(--tbz-dur-mid) var(--tbz-ease-soft),
        color var(--tbz-dur-fast) var(--tbz-ease-soft),
        border-color var(--tbz-dur-mid) var(--tbz-ease-soft),
        box-shadow var(--tbz-dur-mid) var(--tbz-ease-soft),
        filter var(--tbz-dur-mid) var(--tbz-ease-soft) !important;
    will-change: transform, opacity;
}

button:hover,
[role="button"]:hover,
[role="tab"]:hover,
[role="menuitem"]:hover,
.clickable__972a0:hover,
.button__201d5:hover,
.interactive__972a0:hover,
.channel__972a0:hover,
.listItem__650eb:hover,
.peopleListItem_cc6179:hover,
.member__5d473:hover {
    transform: translateY(-1px) scale(var(--tbz-scale-hover));
}

button:active,
[role="button"]:active,
[role="tab"]:active,
[role="menuitem"]:active,
.clickable__972a0:active,
.button__201d5:active,
.interactive__972a0:active,
.channel__972a0:active,
.listItem__650eb:active,
.peopleListItem_cc6179:active,
.member__5d473:active {
    transform: scale(var(--tbz-scale-press));
    transition-duration: var(--tbz-dur-fast) !important;
}

.listItem__650eb,
.containerDefault__29444,
.member__5d473,
.peopleListItem_cc6179,
.privateChannels__35e86 .channel__972a0 {
    animation: tbz-fade-in-up var(--tbz-dur-slow) var(--tbz-ease-standard);
}

.message_d5deea,
.cozy_f5c119.wrapper_c19a55,
.compact_f5c119.wrapper_c19a55,
.groupStart__5126c,
.newMessagesBar__0f481 {
    animation: tbz-fade-in-up var(--tbz-dur-mid) var(--tbz-ease-standard);
}

.sidebarList_c48ade,
.chatContent_a7d72e,
.contentRegionScroller__23e6b,
.messagesWrapper__36d07,
.scroller__36d07,
.standardSidebarView__23e6b,
.base_c48ade {
    animation: tbz-fade-in var(--tbz-dur-slow) var(--tbz-ease-soft);
}

.menu_c1e9c4,
.layer_da8173,
[class*="popout"],
[class*="Popout"],
[class*="modal"],
[class*="Modal"],
[class*="picker"],
[class*="Picker"],
[class*="autocomplete"],
[class*="Autocomplete"] {
    transform-origin: top center;
    animation: tbz-pop-in var(--tbz-dur-mid) var(--tbz-ease-standard);
}

.root__49fc1,
.backdrop__78332,
[class*="backdrop"],
[class*="BackDrop"] {
    animation: tbz-fade-in var(--tbz-dur-mid) var(--tbz-ease-soft);
}

.tabBar__133bf .item__133bf,
.topPill_b3f026 .item_b3f026,
.tabBar_d6f9e9 .item_d6f9e9 {
    position: relative;
    overflow: hidden;
}

.tabBar__133bf .item__133bf::after,
.topPill_b3f026 .item_b3f026::after,
.tabBar_d6f9e9 .item_d6f9e9::after {
    content: "";
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: 4px;
    height: 2px;
    transform: scaleX(0);
    transform-origin: center;
    background: currentColor;
    opacity: 0.65;
    transition: transform var(--tbz-dur-mid) var(--tbz-ease-standard);
}

.tabBar__133bf .item__133bf[aria-selected="true"]::after,
.topPill_b3f026 .item_b3f026[aria-selected="true"]::after,
.tabBar_d6f9e9 .item_d6f9e9[aria-selected="true"]::after {
    transform: scaleX(1);
}

.button__201d5:is(.lookFilled__201d5, .colorBrand__201d5):hover,
.mentioned__5126c,
.replying__5126c {
    animation: tbz-highlight-pulse 650ms var(--tbz-ease-soft) 1;
}

[class*="toast"],
[class*="notice"],
.bar_c38106,
.newMessagesBar__0f481,
.jumpToPresentBar__0f481 {
    animation: tbz-fade-in-up var(--tbz-dur-mid) var(--tbz-ease-standard);
}

input:focus,
textarea:focus,
.searchBar__35e86:focus-within,
.search__49676:focus-within,
.channelTextArea__74017:focus-within {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.16);
}

[class*="typing"],
[class*="status"],
[class*="badge"],
.numberBadge__2b1f5 {
    transition:
        transform var(--tbz-dur-mid) var(--tbz-ease-standard),
        opacity var(--tbz-dur-mid) var(--tbz-ease-soft) !important;
}

[class*="typing"]:hover,
[class*="status"]:hover,
[class*="badge"]:hover,
.numberBadge__2b1f5:hover {
    transform: scale(1.04);
}

@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 1ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 1ms !important;
        scroll-behavior: auto !important;
    }
}
`);
    }

    const mentionReplyFlag = settings.store.mentionReplyFlag as MentionFlagPreset;

    if (mentionReplyFlag === "disabled") {
        css.push(`
.mentioned__5126c,
.replying__5126c,
.mentioned__5126c:hover,
.replying__5126c:hover,
.mentioned__5126c.selected__5126c,
.replying__5126c.selected__5126c {
    background: transparent !important;
    background-image: none !important;
    box-shadow: none !important;
}

.mentioned__5126c::before,
.replying__5126c::before {
    background: transparent !important;
    box-shadow: none !important;
}
`);
    } else if (mentionReplyFlag !== "none") {
        const { background, bar } = getMentionGradients(mentionReplyFlag);
        css.push(`
.mentioned__5126c,
.replying__5126c,
.mentioned__5126c:hover,
.replying__5126c:hover,
.mentioned__5126c.selected__5126c,
.replying__5126c.selected__5126c {
    background: ${background} !important;
}

.mentioned__5126c::before,
.replying__5126c::before {
    background: ${bar} !important;
}
`);
    }

    return css.join("\n");
}

function applyStyle() {
    const css = buildCss();

    if (!style) {
        style = createAndAppendStyle("", managedStyleRootNode);
    }

    style!.textContent = css;
}

const settings = definePluginSettings({
    hideAvatarDecorations: {
        type: OptionType.BOOLEAN,
        description: "Hide avatar decorations everywhere",
        default: true,
        onChange: applyStyle
    },
    scaleReadAllButton: {
        type: OptionType.BOOLEAN,
        description: "Scale the Vencord Read All Notifications button",
        default: true,
        onChange: applyStyle
    },
    scaleFriendCount: {
        type: OptionType.BOOLEAN,
        description: "Scale the online friend count label",
        default: true,
        onChange: applyStyle
    },
    smoothAnimations: {
        type: OptionType.BOOLEAN,
        description: "Enable broad smooth animations for Discord UI",
        default: true,
        onChange: applyStyle
    },
    mentionReplyFlag: {
        type: OptionType.SELECT,
        description: "Pride flag gradient preset for mention/reply highlight.",
        options: [
            { label: "None (default highlight)", value: "none", default: true },
            { label: "Disabled (remove highlight)", value: "disabled" },
            { label: "Pride Rainbow", value: "rainbow" },
            { label: "Bisexual", value: "bi" },
            { label: "Pansexual", value: "pan" },
            { label: "Lesbian", value: "lesbian" },
            { label: "Asexual", value: "asexual" },
            { label: "Transgender", value: "trans" },
            { label: "Non-binary", value: "nonbinary" },
            { label: "Femboy", value: "femboy" }
        ],
        onChange: applyStyle
    }
});

export default definePlugin({
    name: "tobezdev's Tweaks",
    description: "QoL client tweaks with various customisable settings.",
    authors: [Devs.tobezdev, Devs.zffutwo],
    settings,
    start() {
        applyStyle();
    },
    stop() {
        style?.remove();
        style = null;
    }
});
