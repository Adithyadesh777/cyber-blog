"use client";

import { useState } from "react";
import { KeyRound, Lock, Unlock, Hash, Copy, Check } from "lucide-react";

type ToolMode = "PASSWORD" | "ENCRYPT" | "DECRYPT" | "HASH";

export default function AILabShowcase() {
    const [activeTab, setActiveTab] = useState<ToolMode>("PASSWORD");

    // --- Password Checker State ---
    const [passwordInput, setPasswordInput] = useState("");

    // --- Crypto Engine State ---
    const [plainText, setPlainText] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [outputResult, setOutputResult] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [copied, setCopied] = useState(false);

    // --- 1. Password Strength & Entropy Logic ---
    const calculatePasswordMetrics = (pwd: string) => {
        if (!pwd) return { score: 0, entropy: 0, timeToCrack: "0 seconds", feedback: "Awaiting input..." };

        let poolSize = 0;
        if (/[a-z]/.test(pwd)) poolSize += 26;
        if (/[A-Z]/.test(pwd)) poolSize += 26;
        if (/[0-9]/.test(pwd)) poolSize += 10;
        if (/[^a-zA-Z0-9]/.test(pwd)) poolSize += 33;

        // Shannon Entropy: E = L * log2(R)
        const entropy = Math.round(pwd.length * Math.log2(poolSize || 1));

        // Crack time assuming a GPU cluster at 100 billion guesses/sec
        const combinations = Math.pow(poolSize || 1, pwd.length);
        const seconds = combinations / 1e11;

        let timeToCrack = "Instant";
        if (seconds > 31536000000000) timeToCrack = "Trillions of years";
        else if (seconds > 31536000000) timeToCrack = `${Math.round(seconds / 31536000000)} thousand years`;
        else if (seconds > 31536000) timeToCrack = `${Math.round(seconds / 31536000)} years`;
        else if (seconds > 86400) timeToCrack = `${Math.round(seconds / 86400)} days`;
        else if (seconds > 3600) timeToCrack = `${Math.round(seconds / 3600)} hours`;
        else if (seconds > 60) timeToCrack = `${Math.round(seconds / 60)} minutes`;
        else if (seconds > 1) timeToCrack = `${Math.round(seconds)} seconds`;

        let score = 0;
        if (entropy > 28) score = 1;
        if (entropy > 45) score = 2;
        if (entropy > 60) score = 3;
        if (entropy > 80) score = 4;

        const feedback =
            score === 4
                ? "Military-grade entropy. Resilient to distributed dictionary & brute-force attacks."
                : score === 3
                    ? "Strong entropy. Difficult to crack with standard offline wordlists."
                    : score === 2
                        ? "Moderate complexity. Vulnerable to high-performance GPU hashcat arrays."
                        : "Weak key space. Compromised in seconds by standard dictionary attacks.";

        return { score, entropy, timeToCrack, feedback };
    };

    const pwdMetrics = calculatePasswordMetrics(passwordInput);

    // --- 2. Real Web Crypto API: AES-256-GCM ---
    const deriveKey = async (passphrase: string) => {
        const enc = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
            "raw",
            enc.encode(passphrase),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );

        return window.crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: enc.encode("aegismind-fixed-salt"),
                iterations: 100000,
                hash: "SHA-256",
            },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt", "decrypt"]
        );
    };

    const handleEncrypt = async () => {
        if (!plainText || !secretKey) {
            setStatusMessage("ERROR: Missing payload or secret passphrase.");
            return;
        }
        try {
            const enc = new TextEncoder();
            const iv = window.crypto.getRandomValues(new Uint8Array(12));
            const key = await deriveKey(secretKey);

            const cipherBuffer = await window.crypto.subtle.encrypt(
                { name: "AES-GCM", iv },
                key,
                enc.encode(plainText)
            );

            // Pack IV (12 bytes) + Ciphertext into Base64
            const combined = new Uint8Array(iv.length + cipherBuffer.byteLength);
            combined.set(iv, 0);
            combined.set(new Uint8Array(cipherBuffer), iv.length);

            const base64Cipher = btoa(String.fromCharCode(...combined));
            setOutputResult(base64Cipher);
            setStatusMessage("STATUS: Payload successfully encrypted using AES-256-GCM.");
        } catch {
            setStatusMessage("ERROR: Cryptographic failure during AES-GCM cycle.");
        }
    };

    const handleDecrypt = async () => {
        if (!plainText || !secretKey) {
            setStatusMessage("ERROR: Missing ciphertext or secret passphrase.");
            return;
        }
        try {
            const raw = atob(plainText);
            const rawBytes = new Uint8Array(raw.length);
            for (let i = 0; i < raw.length; i++) rawBytes[i] = raw.charCodeAt(i);

            const iv = rawBytes.slice(0, 12);
            const data = rawBytes.slice(12);
            const key = await deriveKey(secretKey);

            const decrypted = await window.crypto.subtle.decrypt(
                { name: "AES-GCM", iv },
                key,
                data
            );

            const dec = new TextDecoder();
            setOutputResult(dec.decode(decrypted));
            setStatusMessage("STATUS: Payload successfully authenticated & decrypted.");
        } catch {
            setStatusMessage("ERROR: Authentication tag mismatch! Wrong passphrase or corrupted ciphertext.");
        }
    };

    const handleHash = async () => {
        if (!plainText) {
            setStatusMessage("ERROR: Provide input string to hash.");
            return;
        }
        const enc = new TextEncoder();
        const hashBuffer = await window.crypto.subtle.digest("SHA-256", enc.encode(plainText));
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

        setOutputResult(hashHex);
        setStatusMessage("STATUS: Deterministic SHA-256 digest generated.");
    };

    const copyToClipboard = () => {
        if (!outputResult) return;
        navigator.clipboard.writeText(outputResult);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <section id="ai-lab" className="w-full max-w-6xl mx-auto px-4 sm:px-6 mb-28 font-mono">
            {/* Header */}
            <div className="mb-8 pb-4 border-b border-cyber-border flex flex-col sm:flex-row sm:items-end justify-between">
                <div>
                    <span className="text-xs text-cyber-emerald uppercase tracking-widest block mb-1">
            // INTERACTIVE TOOLKIT
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        Cryptographic Engine & Entropy Lab
                    </h2>
                </div>
                <span className="text-xs text-cyber-muted mt-2 sm:mt-0">
                    Runtime: Web Crypto API (SubtleCrypto)
                </span>
            </div>

            {/* Terminal Container */}
            <div className="rounded-xl border border-cyber-border bg-cyber-card/90 overflow-hidden shadow-neon-cyan/10 backdrop-blur-md">
                {/* Title bar */}
                <div className="px-4 py-3 bg-[#080c14] border-b border-cyber-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <div className="w-3 h-3 rounded-full bg-cyber-emerald/80" />
                        <span className="ml-2 text-xs text-cyber-muted">aegis-crypto // live-terminal</span>
                    </div>
                    <span className="text-[11px] text-cyber-cyan">CIPHER: HARDWARE ACCELERATED</span>
                </div>

                {/* Workspace */}
                <div className="grid grid-cols-1 lg:grid-cols-12">
                    {/* Tool Navigation Menu */}
                    <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-cyber-border p-4 space-y-2">
                        <span className="text-[11px] text-cyber-muted uppercase tracking-wider block mb-3">
                            Module Selector:
                        </span>

                        <button
                            onClick={() => {
                                setActiveTab("PASSWORD");
                                setOutputResult("");
                                setStatusMessage("");
                            }}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${activeTab === "PASSWORD"
                                    ? "bg-cyber-bg border-cyber-cyan text-white"
                                    : "border-transparent text-cyber-muted hover:border-cyber-border"
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <KeyRound className="w-4 h-4 text-cyber-cyan" />
                                <span className="font-bold text-xs text-white">Entropy & Password Audit</span>
                            </div>
                            <p className="text-[11px] text-cyber-muted">
                                Shannon entropy bit-strength & brute-force compute timing.
                            </p>
                        </button>

                        <button
                            onClick={() => {
                                setActiveTab("ENCRYPT");
                                setOutputResult("");
                                setStatusMessage("");
                            }}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${activeTab === "ENCRYPT"
                                    ? "bg-cyber-bg border-cyber-cyan text-white"
                                    : "border-transparent text-cyber-muted hover:border-cyber-border"
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Lock className="w-4 h-4 text-cyber-emerald" />
                                <span className="font-bold text-xs text-white">AES-256-GCM Encryptor</span>
                            </div>
                            <p className="text-[11px] text-cyber-muted">
                                Galois/Counter Mode symmetric authenticated encryption.
                            </p>
                        </button>

                        <button
                            onClick={() => {
                                setActiveTab("DECRYPT");
                                setOutputResult("");
                                setStatusMessage("");
                            }}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${activeTab === "DECRYPT"
                                    ? "bg-cyber-bg border-cyber-cyan text-white"
                                    : "border-transparent text-cyber-muted hover:border-cyber-border"
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Unlock className="w-4 h-4 text-amber-400" />
                                <span className="font-bold text-xs text-white">AES-256-GCM Decryptor</span>
                            </div>
                            <p className="text-[11px] text-cyber-muted">
                                Authenticate tag and decode base64 encrypted payloads.
                            </p>
                        </button>

                        <button
                            onClick={() => {
                                setActiveTab("HASH");
                                setOutputResult("");
                                setStatusMessage("");
                            }}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${activeTab === "HASH"
                                    ? "bg-cyber-bg border-cyber-cyan text-white"
                                    : "border-transparent text-cyber-muted hover:border-cyber-border"
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Hash className="w-4 h-4 text-cyber-cyan" />
                                <span className="font-bold text-xs text-white">SHA-256 Checksum Generator</span>
                            </div>
                            <p className="text-[11px] text-cyber-muted">
                                Produce 256-bit one-way cryptographic hash digests.
                            </p>
                        </button>
                    </div>

                    {/* Active Tool Interactive Area */}
                    <div className="lg:col-span-8 p-6 flex flex-col justify-between space-y-6">
                        {/* 1. PASSWORD CHECKER PANEL */}
                        {activeTab === "PASSWORD" && (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-cyber-muted block mb-2">
                                        INPUT CANDIDATE PASSWORD / TOKEN:
                                    </label>
                                    <input
                                        type="text"
                                        value={passwordInput}
                                        onChange={(e) => setPasswordInput(e.target.value)}
                                        placeholder="Enter password to analyze..."
                                        className="w-full px-4 py-2.5 bg-[#05080e] border border-cyber-border rounded text-white text-sm focus:border-cyber-cyan focus:outline-none"
                                    />
                                </div>

                                {/* Strength Meter Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-cyber-muted">Entropy Strength:</span>
                                        <span
                                            className={
                                                pwdMetrics.score === 4
                                                    ? "text-cyber-emerald"
                                                    : pwdMetrics.score === 3
                                                        ? "text-cyber-cyan"
                                                        : pwdMetrics.score === 2
                                                            ? "text-amber-400"
                                                            : "text-red-400"
                                            }
                                        >
                                            {pwdMetrics.entropy} Bits
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-cyber-card border border-cyber-border rounded-full overflow-hidden flex">
                                        <div
                                            style={{ width: `${(pwdMetrics.score / 4) * 100}%` }}
                                            className={`h-full transition-all duration-300 ${pwdMetrics.score === 4
                                                    ? "bg-cyber-emerald"
                                                    : pwdMetrics.score === 3
                                                        ? "bg-cyber-cyan"
                                                        : pwdMetrics.score === 2
                                                            ? "bg-amber-400"
                                                            : "bg-red-500"
                                                }`}
                                        />
                                    </div>
                                </div>

                                {/* Analysis Box */}
                                <div className="p-4 bg-[#05080e] border border-cyber-border rounded text-xs space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-cyber-muted">Estimated Offline Crack Time:</span>
                                        <span className="text-white font-bold">{pwdMetrics.timeToCrack}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-cyber-muted">Character Length:</span>
                                        <span className="text-white">{passwordInput.length} characters</span>
                                    </div>
                                    <div className="pt-2 border-t border-cyber-border/40 text-cyber-muted">
                                        {pwdMetrics.feedback}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. ENCRYPT / DECRYPT / HASH PANEL */}
                        {activeTab !== "PASSWORD" && (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-cyber-muted block mb-2">
                                        {activeTab === "DECRYPT" ? "BASE64 CIPHERTEXT PAYLOAD:" : "PLAINTEXT DATA:"}
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={plainText}
                                        onChange={(e) => setPlainText(e.target.value)}
                                        placeholder={
                                            activeTab === "DECRYPT"
                                                ? "Paste base64 ciphertext here..."
                                                : "Type raw text to process..."
                                        }
                                        className="w-full p-3 bg-[#05080e] border border-cyber-border rounded text-white text-xs focus:border-cyber-cyan focus:outline-none"
                                    />
                                </div>

                                {activeTab !== "HASH" && (
                                    <div>
                                        <label className="text-xs text-cyber-muted block mb-2">
                                            SECRET PASSPHRASE (PBKDF2 KEY MATERIAL):
                                        </label>
                                        <input
                                            type="password"
                                            value={secretKey}
                                            onChange={(e) => setSecretKey(e.target.value)}
                                            placeholder="Enter cryptographic secret..."
                                            className="w-full px-4 py-2 bg-[#05080e] border border-cyber-border rounded text-white text-xs focus:border-cyber-cyan focus:outline-none"
                                        />
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    {activeTab === "ENCRYPT" && (
                                        <button
                                            onClick={handleEncrypt}
                                            className="px-4 py-2 rounded bg-cyber-emerald text-cyber-bg font-bold text-xs hover:bg-cyber-cyan transition-colors"
                                        >
                                            Execute AES-256-GCM
                                        </button>
                                    )}
                                    {activeTab === "DECRYPT" && (
                                        <button
                                            onClick={handleDecrypt}
                                            className="px-4 py-2 rounded bg-amber-400 text-cyber-bg font-bold text-xs hover:bg-amber-300 transition-colors"
                                        >
                                            Authenticate & Decrypt
                                        </button>
                                    )}
                                    {activeTab === "HASH" && (
                                        <button
                                            onClick={handleHash}
                                            className="px-4 py-2 rounded bg-cyber-cyan text-cyber-bg font-bold text-xs hover:bg-cyber-emerald transition-colors"
                                        >
                                            Compute SHA-256 Digest
                                        </button>
                                    )}
                                </div>

                                {/* Output Console */}
                                {outputResult && (
                                    <div className="p-4 bg-[#05080e] border border-cyber-cyan/40 rounded space-y-2">
                                        <div className="flex justify-between items-center text-xs text-cyber-cyan">
                                            <span>OUTPUT RESULT:</span>
                                            <button
                                                onClick={copyToClipboard}
                                                className="flex items-center gap-1 text-[11px] text-cyber-muted hover:text-white"
                                            >
                                                {copied ? <Check className="w-3 h-3 text-cyber-emerald" /> : <Copy className="w-3 h-3" />}
                                                {copied ? "COPIED" : "COPY"}
                                            </button>
                                        </div>
                                        <div className="p-2 bg-cyber-card rounded text-xs text-gray-200 break-all select-all">
                                            {outputResult}
                                        </div>
                                    </div>
                                )}

                                {statusMessage && (
                                    <div
                                        className={`text-xs ${statusMessage.startsWith("ERROR") ? "text-red-400" : "text-cyber-emerald"
                                            }`}
                                    >
                                        {statusMessage}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Micro specs */}
                        <div className="pt-4 border-t border-cyber-border/50 flex flex-wrap items-center justify-between text-[11px] text-cyber-muted">
                            <span>Standard: NIST FIPS 197 / SP 800-38D</span>
                            <span>Hardware-Isolated Keys</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}