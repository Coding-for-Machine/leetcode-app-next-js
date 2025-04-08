"use server";

import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined in environment variables");
}

export const encryptData = async (data: any): Promise<string> => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = async (encryptedData: string): Promise<any> => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};