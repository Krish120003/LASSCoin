import { useState, useEffect, useHistory } from "react";
import "crypto";


async function FileProcessor(priv_key) {
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

function generateUUID4String () {
    // return uuid
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

function getPublicKey(privateKey) {
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
  
      console.log(privateKey, keys.privateKey)
  
      // export private key to JWK
      const jwk = await crypto.subtle.exportKey("jwk", privateKey).catch(
        err => console.error(err)
      );
  
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
}

function getPublicKeyAsText(publicKey) {
    // return string
}

function sign(sender, target, uuid, amount, signingPrivateKey) {
    // First, create string "message"
    // The message format is in DMs from a few days ago
    // Then get hash of message
    // And then sign it using the signingPrivateKey

    /*
    Sample Data (valid):
    (Use these values to test your stuff)

    {
        "sender":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxhrRjWzQUKHLOve5TPOd3dE0WUg1gSws9bdT1U2yBxBRGZevxSIe1R25E9TcbMCim8pj1fPjmJh0Z3RsDuOxQxFQe/y2XV38ezTV86XuwgCj/Q6jhPVn0pKzn9IWvSKzZ4E+vwCfcpG9Z3fyBcm2qJ0nICjHPZp9MbbJmBqK04gnl2374ZnxgqIzhRDmdZy73ZWW24fXHP2XZ+aYa2GS8qEu5eMQ7BuP35dA+kOrX6R2NZRhXfV0OZV58HmKt7m3tj6gQhtr8TjNA/YcE3zQAG6yEubsm/l7Zlscnvz+3M9Zsvz2wJIRE13RmYScDJ+9pS0kncSp2Tof6BiI8p0UQwIDAQAB",
        "target":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArUJ3miD2D2mR/83TeqfV9gt/9Q47FCJYmQltdNh+3JpKbjP7rxArgwGB/5mzHG6/SwtJSg5GYnCuI8pYBtq2LiDPPadDRnLb2dAulcUW2bkdK6xo6LeiCwfNxeEWlZW0kKRcqt1+0A4MyvO0AVanyQGVmt1XOGqDaID1dPO861gHpgrQZes+5zH9UOLGrVKrytQPp4wzn9azW74ErDcz2obMXvDmMMXnrBDCcUErbDCPPXBTKaLlAd+wdquvEOJcSdZfa74O/YaFQx0Gw4N3t8UwS8VSf9Wo5miWH4p2CGACIi4foM/vfhGnlWQ41gImTYN6WVZA4j3ZR2eyKMUMhwIDAQAB",
        "value":3.984580988793731,
        "signature":"Y5M1UaNUYh1yd7sgdZuoxf9PNpQ6qoV3DDqCnbTEe6dX4rb1DZOt3oIzqFQvRJ/5Wm2Qse/3XVss74/Jy28W1npPTpptkMMxczzn2VZXiU/6eqlDia/PYw9nGfCdKezhI8NxIT7eJfJLryf033euLjGx83TjIFe9lTzHObKFsyybZ/DApx8MzRyfHn1I9X3FC53R2cftN1Qgp8uRX1Aj/HaHTtRxLQMHyny/rTyOyd2t0cVutp1llQU4Y3F8dDx3e7bGRDFR84Hm1pyxYZvmtpt3ffM7acjHaFXTDuOqrif4U0I/aIBzaO80EMIlUIearvCynKDoQMjJJPgC4LYUiw==",
        "uuid":"3d14dffa-6eee-4c3f-b539-1e10dded4de5"
    }

    */

    // return string
}