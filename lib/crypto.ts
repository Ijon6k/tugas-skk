const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// === SHA-256 ===
export async function sha256(text: string) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(hash);
  const base64 = btoa(String.fromCharCode(...bytes));
  return { bytes, base64 };
}

// === RANDOM SALT GENERATOR ===
export function generateSalt(len = 16) {
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return btoa(String.fromCharCode(...arr));
}

function bytesToKey(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => String.fromCharCode(b))
    .join("");
}

// === ENCRYPTION ===
export async function encrypt(text: string, key: string): Promise<string> {
  const salt = generateSalt();
  const hashed = await sha256(key + salt);
  const derived = bytesToKey(hashed.bytes);

  let result = "";

  for (let i = 0; i < text.length; i++) {
    const t = text.charCodeAt(i);
    const k = derived.charCodeAt(i % derived.length);
    const xor = t ^ k;

    const i1 = xor % 62;
    const i2 = Math.floor(xor / 62) % 62;
    result += chars[i1] + chars[i2];
  }

  // format final: SALT | HASH | CIPHERTEXT
  return `${salt}|${hashed.base64}|${result}`;
}

// === DECRYPTION ===
export async function decrypt(data: string, key: string): Promise<string> {
  const [salt, hash, cipher] = data.split("|");
  if (!salt || !hash || !cipher) return "Format salah";

  const hashed = await sha256(key + salt);
  const derived = bytesToKey(hashed.bytes);

  let result = "";

  for (let i = 0; i < cipher.length; i += 2) {
    const c1 = chars.indexOf(cipher[i]);
    const c2 = chars.indexOf(cipher[i + 1]);

    const xor = c1 + c2 * 62;
    const k = derived.charCodeAt((i / 2) % derived.length);
    result += String.fromCharCode(xor ^ k);
  }

  return result;
}

// === HASHING WITH SALT ===
export async function hashWithSalt(text: string) {
  const salt = generateSalt();
  const hashed = await sha256(text + salt);

  return {
    salt,
    hash: hashed.base64,
  };
}
