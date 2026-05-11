export const HIDE_AVATAR_DECORATIONS = `
/* Hide avatar decorations everywhere */
[class="avatarDecoration"],
[class*="avatarDecorationContainer"],
svg[class="avatarDecoration"],
img[class*="avatarDecoration"] {
    display: none !important;
}
`;

export const SCALE_READ_ALL_BUTTON = `
/* Fix display width of 'read all' button for notifications & unreads */
button.vc-text-btn-base.vc-text-btn-secondary.vc-ranb-button {
    scale: 0.8;
}
`;

export const SCALE_FRIEND_COUNT = `
/* Fix display width of online friend count */
span#vc-friendcount {
    scale: 0.9;
}
`;

export const SMOOTH_ANIMATIONS = `
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
`;

export const MENTION_REPLY_DISABLED = `
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
`;

export const buildMentionReplyFlag = (background: string, bar: string) => `
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
`;