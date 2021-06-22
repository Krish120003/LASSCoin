import { v4 as uuidv4 } from "uuid";
import "crypto";

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // convert bytes to hex string
  return hashHex;
}

function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function generateUUID4String() {
  // return uuid
  return uuidv4();
}

function importPrivateKey(privateKeyText) {
  // return CryptoKey object
  // fetch the part of the privateKeyText string between header and footer
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = privateKeyText.substring(
    pemHeader.length,
    privateKeyText.length - pemFooter.length
  );
  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents);
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString);

  return window.crypto.subtle.importKey(
    "pkcs8",
    binaryDer,
    {
      name: "RSASSA-PKCS1-v1_5",
      // Consider using a 4096-bit key for systems that require long-term security
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign"]
  );
}

async function getPublicKey(privateKey) {
  // return CryptoKey object
  const keys = await crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: { name: "SHA-256" },
    },
    true,
    ["sign", "verify"]
  );

  console.log(privateKey, keys.privateKey);

  // export private key to JWK
  const jwk = await crypto.subtle
    .exportKey("jwk", privateKey)
    .catch((err) => console.error(err));

  // remove private data from JWK
  delete jwk.d;
  delete jwk.dp;
  delete jwk.dq;
  delete jwk.q;
  delete jwk.qi;
  jwk.key_ops = ["encrypt", "wrapKey"];

  // import public key
  const publicKey = await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    true,
    []
  );

  console.log(publicKey);

  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }

  async function exportCryptoKey(publicKey) {
    console.log("HELL");
    const exported = await window.crypto.subtle
      .exportKey("spki", publicKey)
      .catch((err) => console.error(err));
    console.log("Exported", exported);

    const exportedAsString = ab2str(exported);
    const exportedAsBase64 = window.btoa(exportedAsString);
    const pemExported = { exportedAsBase64 };

    console.log(pemExported);
  }
  return await exportCryptoKey(publicKey);
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

async function getPublicKeyAsText(publicKey) {
  // return string
  const exported = await window.crypto.subtle
    .exportKey("spki", publicKey)
    .catch((err) => console.error(err));
  console.log("Exported", exported);

  const exportedAsString = ab2str(exported);
  const exportedAsBase64 = window.btoa(exportedAsString);
  const pemExported = { exportedAsBase64 };

  console.log(pemExported);
  return pemExported;
}

module.exports = {
  generateUUID4String,
  importPrivateKey,
  getPublicKey,
  getPublicKeyAsText,
};