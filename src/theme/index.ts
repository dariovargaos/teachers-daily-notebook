import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: {
          value: `"Inter", ui-sans-serif, system-ui, sans-serif`,
        },
        display: {
          value: `"Fraunces", ui-serif, Georgia, serif`,
        },
      },
    },
    semanticTokens: {
      colors: {
        // ── Override built-in semantic tokens ──────────────────────
        bg: {
          value: {
            _light: "oklch(0.965 0.014 80)",
            _dark: "oklch(0.129 0.042 264.695)",
          },
        },
        fg: {
          value: {
            _light: "oklch(0.24 0.028 50)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },
        border: {
          value: {
            _light: "oklch(0.86 0.022 75)",
            _dark: "oklch(1 0 0 / 10%)",
          },
        },

        // ── Primary ────────────────────────────────────────────────
        "primary.solid": {
          value: {
            _light: "oklch(0.3 0.035 45)",
            _dark: "oklch(0.929 0.013 255.508)",
          },
        },
        "primary.contrast": {
          value: {
            _light: "oklch(0.98 0.01 85)",
            _dark: "oklch(0.208 0.042 265.755)",
          },
        },
        "primary.fg": {
          value: {
            _light: "oklch(0.3 0.035 45)",
            _dark: "oklch(0.929 0.013 255.508)",
          },
        },

        // ── Secondary ──────────────────────────────────────────────
        "secondary.solid": {
          value: {
            _light: "oklch(0.93 0.02 80)",
            _dark: "oklch(0.279 0.041 260.031)",
          },
        },
        "secondary.contrast": {
          value: {
            _light: "oklch(0.28 0.03 50)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },
        "secondary.fg": {
          value: {
            _light: "oklch(0.28 0.03 50)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },

        // ── Muted ──────────────────────────────────────────────────
        "muted.solid": {
          value: {
            _light: "oklch(0.935 0.016 80)",
            _dark: "oklch(0.279 0.041 260.031)",
          },
        },
        "muted.contrast": {
          value: {
            _light: "oklch(0.52 0.025 60)",
            _dark: "oklch(0.704 0.04 256.788)",
          },
        },
        "muted.fg": {
          value: {
            _light: "oklch(0.52 0.025 60)",
            _dark: "oklch(0.704 0.04 256.788)",
          },
        },

        // ── Accent ─────────────────────────────────────────────────
        "accent.solid": {
          value: {
            _light: "oklch(0.72 0.11 55)",
            _dark: "oklch(0.279 0.041 260.031)",
          },
        },
        "accent.contrast": {
          value: {
            _light: "oklch(0.2 0.03 50)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },
        "accent.fg": {
          value: {
            _light: "oklch(0.2 0.03 50)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },

        // ── Card ───────────────────────────────────────────────────
        "card.solid": {
          value: {
            _light: "oklch(0.99 0.008 85)",
            _dark: "oklch(0.208 0.042 265.755)",
          },
        },
        "card.contrast": {
          value: {
            _light: "oklch(0.24 0.028 50)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },
        "card.fg": {
          value: {
            _light: "oklch(0.24 0.028 50)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },

        // ── Popover ────────────────────────────────────────────────
        "popover.solid": {
          value: {
            _light: "oklch(0.99 0.008 85)",
            _dark: "oklch(0.208 0.042 265.755)",
          },
        },
        "popover.contrast": {
          value: {
            _light: "oklch(0.24 0.028 50)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },
        "popover.fg": {
          value: {
            _light: "oklch(0.24 0.028 50)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },

        // ── Destructive ────────────────────────────────────────────
        "destructive.solid": {
          value: {
            _light: "oklch(0.55 0.19 25)",
            _dark: "oklch(0.704 0.191 22.216)",
          },
        },
        "destructive.contrast": {
          value: {
            _light: "oklch(0.99 0 0)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },
        "destructive.fg": {
          value: {
            _light: "oklch(0.55 0.19 25)",
            _dark: "oklch(0.704 0.191 22.216)",
          },
        },

        // ── Input ──────────────────────────────────────────────────
        "input.solid": {
          value: {
            _light: "oklch(0.9 0.02 78)",
            _dark: "oklch(1 0 0 / 15%)",
          },
        },

        // ── Ring (focus ring) ──────────────────────────────────────
        ring: {
          value: {
            _light: "oklch(0.55 0.09 55)",
            _dark: "oklch(0.551 0.027 264.364)",
          },
        },

        // ── Custom brand tokens (gold, paper, ink) ─────────────────
        gold: {
          value: { _light: "oklch(0.74 0.1 60)", _dark: "oklch(0.74 0.1 60)" },
        },
        paper: {
          value: {
            _light: "oklch(0.99 0.01 85)",
            _dark: "oklch(0.208 0.042 265.755)",
          },
        },
        ink: {
          value: {
            _light: "oklch(0.22 0.025 50)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },

        // ── Chart colors ───────────────────────────────────────────
        "chart.1": {
          value: {
            _light: "oklch(0.646 0.222 41.116)",
            _dark: "oklch(0.488 0.243 264.376)",
          },
        },
        "chart.2": {
          value: {
            _light: "oklch(0.6 0.118 184.704)",
            _dark: "oklch(0.696 0.17 162.48)",
          },
        },
        "chart.3": {
          value: {
            _light: "oklch(0.398 0.07 227.392)",
            _dark: "oklch(0.769 0.188 70.08)",
          },
        },
        "chart.4": {
          value: {
            _light: "oklch(0.828 0.189 84.429)",
            _dark: "oklch(0.627 0.265 303.9)",
          },
        },
        "chart.5": {
          value: {
            _light: "oklch(0.769 0.188 70.08)",
            _dark: "oklch(0.645 0.246 16.439)",
          },
        },

        // ── Sidebar ────────────────────────────────────────────────
        "sidebar.solid": {
          value: {
            _light: "oklch(0.984 0.003 247.858)",
            _dark: "oklch(0.208 0.042 265.755)",
          },
        },
        "sidebar.contrast": {
          value: {
            _light: "oklch(0.129 0.042 264.695)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },
        "sidebar.fg": {
          value: {
            _light: "oklch(0.129 0.042 264.695)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },
        "sidebar.primary": {
          value: {
            _light: "oklch(0.208 0.042 265.755)",
            _dark: "oklch(0.488 0.243 264.376)",
          },
        },
        "sidebar.primary.contrast": {
          value: {
            _light: "oklch(0.984 0.003 247.858)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },
        "sidebar.accent": {
          value: {
            _light: "oklch(0.968 0.007 247.896)",
            _dark: "oklch(0.279 0.041 260.031)",
          },
        },
        "sidebar.accent.contrast": {
          value: {
            _light: "oklch(0.208 0.042 265.755)",
            _dark: "oklch(0.984 0.003 247.858)",
          },
        },
        "sidebar.border": {
          value: {
            _light: "oklch(0.929 0.013 255.508)",
            _dark: "oklch(1 0 0 / 10%)",
          },
        },
        "sidebar.ring": {
          value: {
            _light: "oklch(0.704 0.04 256.788)",
            _dark: "oklch(0.551 0.027 264.364)",
          },
        },
      },
    },

    // ── Text styles (replaces .font-display) ───────────────────
    textStyles: {
      display: {
        value: {
          fontFamily: "display",
          letterSpacing: "-0.02em",
          fontOpticalSizing: "auto",
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
