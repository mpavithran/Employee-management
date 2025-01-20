const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const LogDetails = require("../model/log.details.model");
const ApiTrackDetails = require("../model/api.track.details.model");
const User = require("../model/users.model");

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

utils.logDetails = async (data) => {
  console.log(data);
  try {
    await LogDetails.create(data);
  } catch (error) {
    console.log(error);
  }
};

utils.generateRandomId = async (type) => {
  if (type === "ADMIN") {
    let userId;

    while (!userId) {
      userId = uuidv4();
      const ifExist = await User.count({
        where: {
          userId,
        },
      });

      if (ifExist > 0) userId = null;
    }
    return userId;
  }
};

utils.passwordHashing = async (password) => {
  try {
    const salt = parseInt(process?.env?.SALT);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password:", err);
  }
};

utils.passwordCompare = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (err) {
    console.error("Error comparing password:", err);
  }
};

utils.generateUserToken = (payload) => {
  const options = {
    //   expiresIn: "1h",
  };
  const token = jwt.sign(payload, process?.env?.JWT_SECRET_KEY, options);
  return token;
};

utils.verifyUserToken = (token) => {
  try {
    const decoded = jwt.verify(token, process?.env?.JWT_SECRET_KEY);
    console.log("Decoded Payload:", decoded);
    return decoded;
  } catch (error) {
    console.error("Token Verification Failed:", error.message);
    return null;
  }
};

module.exports = utils;
