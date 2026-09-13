"use client";

import { useEffect, useRef } from "react";

interface NodeDigit {
    x: number;
    y: number;
    char: string;
    alpha: number;
    targetAlpha: number;
    fadeSpeed: number;
    isCyan: boolean;
}

const HEX_CHARS = [
    "0", "1", "0x", "FF", "A4", "7E", "10", "C9", "8B", "E1", "01", "3F", "D2", "99"
];

export default function CyberDigitsBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Responsive resize handler
        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initNodes();
        };
        window.addEventListener("resize", handleResize);

        // Create fixed grid points where digits can pop up
        const gridSize = 48; // Spacing between potential digit coordinates
        let nodes: NodeDigit[] = [];

        const initNodes = () => {
            nodes = [];
            const cols = Math.floor(width / gridSize);
            const rows = Math.floor(height / gridSize);

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    // Only spawn a digit particle at ~22% of grid positions for a clean, non-cluttered look
                    if (Math.random() < 0.22) {
                        nodes.push({
                            x: c * gridSize + Math.random() * 10,
                            y: r * gridSize + Math.random() * 10,
                            char: HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)],
                            alpha: Math.random() * 0.25,
                            targetAlpha: Math.random() > 0.5 ? Math.random() * 0.45 + 0.1 : 0,
                            fadeSpeed: Math.random() * 0.008 + 0.004,
                            isCyan: Math.random() > 0.35, // Cyan vs Emerald accent
                        });
                    }
                }
            }
        };

        initNodes();

        // Render loop
        const render = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.font = "8px 'Space Mono', monospace";
            ctx.textAlign = "center";

            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];

                // Smooth fade interpolation
                if (node.alpha < node.targetAlpha) {
                    node.alpha = Math.min(node.targetAlpha, node.alpha + node.fadeSpeed);
                } else {
                    node.alpha = Math.max(node.targetAlpha, node.alpha - node.fadeSpeed);
                }

                // When a cycle finishes, switch direction and occasionally cycle the character
                if (Math.abs(node.alpha - node.targetAlpha) < 0.01) {
                    if (node.targetAlpha === 0) {
                        // Pick a new target opacity and occasionally mutate the digit
                        node.targetAlpha = Math.random() * 0.45 + 0.08;
                        node.char = HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
                    } else {
                        // Fade back out
                        node.targetAlpha = 0;
                    }
                }

                // Draw the fading digit
                if (node.alpha > 0.01) {
                    ctx.fillStyle = node.isCyan
                        ? `rgba(6, 182, 212, ${node.alpha})` // Neon Cyan
                        : `rgba(16, 185, 129, ${node.alpha})`; // Neon Emerald
                    ctx.fillText(node.char, node.x, node.y);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-0 opacity-80"
        />
    );
}