"use client";
import React, { useState } from "react";
import { encrypt, decrypt, hashWithSalt } from "@/lib/crypto";
import ModeSwitch from "./Modeswitch";

export default function EncryptionForm() {
  const [mode, setMode] = useState<"encrypt" | "decrypt" | "hash">("encrypt");
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");
  const [salt, setSalt] = useState("");

  const handleProcess = async () => {
    if (!text.trim()) {
      alert("Teks tidak boleh kosong!");
      return;
    }

    if (mode !== "hash" && !key.trim()) {
      alert("Key tidak boleh kosong!");
      return;
    }

    if (mode === "encrypt") {
      const result = await encrypt(text, key);
      setOutput(result);
      setSalt("");
      return;
    }

    if (mode === "decrypt") {
      const result = await decrypt(text, key);
      setOutput(result);
      setSalt("");
      return;
    }

    if (mode === "hash") {
      const result = await hashWithSalt(text);
      setSalt(result.salt);
      setOutput(result.hash);
    }
  };

  const labelText =
    mode === "encrypt"
      ? "Text to Encrypt"
      : mode === "decrypt"
      ? "Text to Decrypt"
      : "Text to Hash";

  const outputLabel =
    mode === "encrypt"
      ? "Encrypted Output"
      : mode === "decrypt"
      ? "Decrypted Output"
      : "Hash Output";

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-all duration-300">
      <ModeSwitch mode={mode} setMode={setMode} />

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {labelText}
          </label>
          <textarea
            placeholder="Masukkan teks..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 h-24 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        {mode !== "hash" && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Key
            </label>
            <input
              type="text"
              placeholder="Masukkan key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>
        )}

        <button
          onClick={handleProcess}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          {mode === "encrypt"
            ? "🔒 Encrypt"
            : mode === "decrypt"
            ? "🔓 Decrypt"
            : "🔑 Hash"}
        </button>

        {mode === "hash" && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Generated Salt
            </label>
            <textarea
              readOnly
              value={salt}
              placeholder="Salt muncul di sini..."
              className="w-full border border-gray-300 rounded-lg p-3 h-20 bg-gray-50 focus:outline-none"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            {outputLabel}
          </label>
          <textarea
            readOnly
            placeholder="Hasil akan muncul di sini..."
            value={output}
            className="w-full border border-gray-300 rounded-lg p-3 h-24 bg-gray-50 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
