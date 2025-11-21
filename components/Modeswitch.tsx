interface ModeSwitchProps {
  mode: "encrypt" | "decrypt" | "hash";
  setMode: (mode: "encrypt" | "decrypt" | "hash") => void;
}

export default function ModeSwitch({ mode, setMode }: ModeSwitchProps) {
  return (
    <div className="flex flex-col space-y-2">
      <span className="text-sm font-medium text-gray-600">
        Mode:{" "}
        {mode === "encrypt"
          ? "Encrypt"
          : mode === "decrypt"
          ? "Decrypt"
          : "Hash"}
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => setMode("encrypt")}
          className={`flex-1 px-3 py-1 rounded-lg text-sm transition ${
            mode === "encrypt"
              ? "bg-indigo-600 text-white"
              : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
          }`}
        >
          🔒 Encrypt
        </button>

        <button
          onClick={() => setMode("decrypt")}
          className={`flex-1 px-3 py-1 rounded-lg text-sm transition ${
            mode === "decrypt"
              ? "bg-indigo-600 text-white"
              : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
          }`}
        >
          🔓 Decrypt
        </button>

        <button
          onClick={() => setMode("hash")}
          className={`flex-1 px-3 py-1 rounded-lg text-sm transition ${
            mode === "hash"
              ? "bg-indigo-600 text-white"
              : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
          }`}
        >
          🔑 Hash
        </button>
      </div>
    </div>
  );
}
