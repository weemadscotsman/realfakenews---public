import type { AnchorPersonality } from "./generate-anchor-script";
import personalities from "./anchor-personalities.json";
import veoConfig from "./veo-config.json";

export function buildVeoPrompt(anchorKey: string, script: string) {
    const anchor = (personalities as Record<string, AnchorPersonality>)[anchorKey];

    if (!anchor) {
        throw new Error(`Anchor personality not found for key: ${anchorKey}`);
    }

    return `
${veoConfig.studio_base}

Anchor Description:
${anchor.visual.appearance}

Studio Style:
${anchor.visual.studioStyle}

Speech Script:
${script}

Camera Rules:
${veoConfig.camera_rules.join(", ")}

Motion Rules:
${veoConfig.motion_rules.join(", ")}
`;
}
