import jwt from "jsonwebtoken";

export async function verifyToken(token: string) {
  try {
    const res = await jwt.verify(token, process.env.SECRET_KEY || "");
    return {
      ...(res as {}),
      valid: true,
    };
  } catch (errr) {
    return {
      valid: false,
    };
  }
}

export async function hashString(message: any) {
  const Crypto = require("crypto-js");
  return Crypto.SHA256(message).toString(Crypto.enc.Hex);
}

export async function verifyHash(message: any, hash: any) {
  const stringHash = await hashString(message);
  if (hash === stringHash) {
    return true;
  }
  return false;
}
