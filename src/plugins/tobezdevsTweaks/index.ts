import { definePluginSettings } from "@api/Settings";
import { managedStyleRootNode } from "@api/Styles";
import { Devs } from "@utils/constants";
import { createAndAppendStyle } from "@utils/css";
import definePlugin, { OptionType } from "@utils/types";

import {
    buildMentionReplyFlag,
    HIDE_AVATAR_DECORATIONS,
    MENTION_REPLY_DISABLED,
    SCALE_FRIEND_COUNT,
    SCALE_READ_ALL_BUTTON,
    SMOOTH_ANIMATIONS
} from "./styleSnippets";


type MentionFlagPreset = "none" | "disabled" | "bi" | "pan" | "trans" | "lesbian" | "nonbinary" | "asexual" | "rainbow" | "femboy";

let style: HTMLStyleElement | null = null;


function getMentionGradients(preset: MentionFlagPreset, opacity: number) {
    switch (preset) {
        case "pan":
            return {
                background: `linear-gradient(100deg, rgba(255, 27, 141, ${opacity}) 0%, rgba(255, 27, 141, ${opacity}) 34%, rgba(255, 218, 0, 0.2) 50%, rgba(26, 179, 255, ${opacity}) 66%, rgba(26, 179, 255, ${opacity}) 100%)`,
                bar: "linear-gradient(180deg, #ff1b8d 0%, #ffda00 50%, #1ab3ff 100%)"
            };
        case "trans":
            return {
                background: `linear-gradient(100deg, rgba(91, 206, 250, ${opacity}) 0%, rgba(245, 169, 184, 0.2) 25%, rgba(255, 255, 255, 0.18) 50%, rgba(245, 169, 184, 0.2) 75%, rgba(91, 206, 250, ${opacity}) 100%)`,
                bar: "linear-gradient(180deg, #5bcefa 0%, #f5a9b8 25%, #ffffff 50%, #f5a9b8 75%, #5bcefa 100%)"
            };
        case "lesbian":
            return {
                background: `linear-gradient(100deg, rgba(213, 45, 0, ${opacity}) 0%, rgba(239, 118, 39, 0.22) 25%, rgba(255, 154, 86, 0.2) 42%, rgba(181, 86, 144, 0.2) 58%, rgba(163, 2, 98, ${opacity}) 78%, rgba(163, 2, 98, ${opacity}) 100%)`,
                bar: "linear-gradient(180deg, #d52d00 0%, #ef7627 25%, #ff9a56 42%, #d162a4 58%, #b55690 72%, #a30262 100%)"
            };
        case "nonbinary":
            return {
                background: `linear-gradient(100deg, rgba(252, 244, 52, ${opacity}) 0%, rgba(252, 244, 52, ${opacity}) 30%, rgba(252, 252, 252, 0.2) 50%, rgba(156, 89, 209, 0.22) 70%, rgba(45, 45, 45, 0.26) 100%)`,
                bar: "linear-gradient(180deg, #fcf434 0%, #fcfcfc 33%, #9c59d1 66%, #2d2d2d 100%)"
            };
        case "asexual":
            return {
                background: `linear-gradient(100deg, rgba(18, 18, 18, 0.26) 0%, rgba(163, 163, 163, 0.2) 35%, rgba(255, 255, 255, 0.18) 50%, rgba(128, 0, 128, ${opacity}) 75%, rgba(128, 0, 128, ${opacity}) 100%)`,
                bar: "linear-gradient(180deg, #121212 0%, #a3a3a3 33%, #ffffff 66%, #800080 100%)"
            };
        case "rainbow":
            return {
                background: `linear-gradient(100deg, rgba(229, 0, 0, ${opacity}) 0%, rgba(255, 141, 0, 0.22) 16%, rgba(255, 238, 0, 0.2) 33%, rgba(2, 129, 33, 0.2) 50%, rgba(0, 76, 255, 0.22) 66%, rgba(119, 0, 136, ${opacity}) 84%, rgba(119, 0, 136, ${opacity}) 100%)`,
                bar: "linear-gradient(180deg, #e50000 0%, #ff8d00 16%, #ffee00 33%, #028121 50%, #004cff 66%, #770088 84%, #770088 100%)"
            };
        case "bi":
            return {
                background: `linear-gradient(100deg, rgba(214, 2, 112, ${opacity}) 0%, rgba(190, 42, 131, ${opacity}) 28%, rgba(155, 79, 150, ${opacity}) 50%, rgba(104, 71, 159, ${opacity}) 72%, rgba(0, 56, 168, ${opacity}) 100%)`,
                bar: "linear-gradient(180deg, #d60270 0%, #bf2a83 30%, #9b4f96 50%, #68479f 72%, #0038a8 100%)"
            };

        case "femboy": {
            return {
                background: `linear-gradient(100deg, rgba(212, 96, 167, ${opacity}) 0%, rgba(228, 173, 205, ${opacity}) 16.67%, rgba(255, 255, 255, ${opacity}) 33.33%, rgba(87, 206, 248, ${opacity}) 50%, rgba(255, 255, 255, ${opacity}) 66.67%, rgba(228, 173, 205, ${opacity}) 83.33%, rgba(212, 96, 167, ${opacity}) 100%)`,
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
        css.push(HIDE_AVATAR_DECORATIONS);
    }

    if (settings.store.scaleReadAllButton) {
        css.push(SCALE_READ_ALL_BUTTON);
    }

    if (settings.store.scaleFriendCount) {
        css.push(SCALE_FRIEND_COUNT);
    }

    if (settings.store.smoothAnimations) {
        css.push(SMOOTH_ANIMATIONS);
    }

    const mentionReplyFlag = settings.store.mentionReplyFlag as MentionFlagPreset;
    let opacity = settings.store.mentionReplyFlagOpacity;
    if (typeof opacity === "number") {
        opacity = Math.max(0, Math.min(1, opacity / 100));
    } else {
        opacity = 0.2;
    }

    if (mentionReplyFlag === "disabled") {
        css.push(MENTION_REPLY_DISABLED);
    } else if (mentionReplyFlag !== "none") {
        const { background, bar } = getMentionGradients(mentionReplyFlag, opacity);
        css.push(buildMentionReplyFlag(background, bar));
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
    },
    mentionReplyFlagOpacity: {
        type: OptionType.SLIDER,
        description: "Opacity for the mention/reply highlight (0%-100%). Does not apply to 'None' or 'Disabled' presets.",
        markers: [0, 20, 40, 60, 80, 100],
        default: 20,
        stickToMarkers: false,
        onChange: applyStyle
    }
});

export default definePlugin({
    name: "tobezdev's Tweaks",
    description: "QoL client tweaks with various customisable settings.",
    authors: [Devs.tobezdev],
    settings,
    start() {
        applyStyle();
    },
    stop() {
        style?.remove();
        style = null;
    }
});
