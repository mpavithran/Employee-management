const crypto = require("crypto");
const utils = {};

utils.encryptText = (plainText) => {
  const key = process.env.ENCRYPTION_KEY;

  if (!key || key.length !== 32) {
    throw new Error("Key must be 32 bytes long (256-bit)");
  }

  const hash = crypto.createHash("sha256").update(plainText).digest();
  const nonce = hash.slice(0, 12);

  const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(key), nonce);

  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  const finalCipher = Buffer.concat([nonce, encrypted, authTag]);

  return finalCipher.toString("base64");
};

utils.decryptText = (cipherText) => {
  const key = process.env.ENCRYPTION_KEY;

  if (!key || key.length !== 32) {
    throw new Error("Key must be 32 bytes long (256-bit)");
  }

  const cipherBytes = Buffer.from(cipherText, "base64");

  if (cipherBytes.length < 28) {
    throw new Error("Ciphertext is too short to contain a nonce and auth tag");
  }

  const nonce = cipherBytes.slice(0, 12);

  const authTag = cipherBytes.slice(cipherBytes.length - 16);
  const encryptedContent = cipherBytes.slice(12, cipherBytes.length - 16);

  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    Buffer.from(key),
    nonce
  );
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encryptedContent),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
};

module.exports = utils;
