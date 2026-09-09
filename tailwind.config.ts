import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    bg: "#080c14",        // Deep void background
                    card: "#0d1424",      // HUD card background
                    border: "#1a243a",    // Dark slate border
                    cyan: "#00f0ff",      // Neon cyan accent
                    emerald: "#00ff9d",   // Terminal green accent
                    purple: "#9d00ff",    // AI agent violet accent
                    muted: "#6272a4",     // Low-contrast text
                },
            },
            boxShadow: {
                "neon-cyan": "0 0 20px -5px rgba(0, 240, 255, 0.4)",
                "neon-emerald": "0 0 20px -5px rgba(0, 255, 157, 0.4)",
            },
        },
    },
    plugins: [],
};

export default config;