import logo from "./logo.svg";
import "./App.css";
import "crypto";
import { useState, useEffect } from "react";

const priv_key =
  "-----BEGIN PRIVATE KEY-----MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCFFFB2vAEeQ2IAEKGNcLKPE4jKJWdIzwpD+6THpMdZGkLbQDddKcwFfnz0LnbSim6w+Q1KEkOCn28rbYtlt9f617c/ZEz0KiAPheoVbgwZIvAvj9T7p4aauT0u1lLh09mu7AdjKiEJHjd1Zt+Mbw1aZdAwL17Ozr5IgrYuv1pj3lPieYzevu9t5ECfNtzURcbZ3fX1dSK5nmqVGYqfg6fAM3iZkmhR7LSLtWd08u/bZwkmCsCeq3yOLeASKy9/Vep5kRPUDyGDFOVHSRbsYz3CKz+iZinL8n+HcnuEnFSRyYqwVVK7kioCLvMKDEOE3gibUwxIdbbVnvBfw1YtdpyxAgMBAAECggEAAInBfYlrE71AAzIOBS1ke3Gfxvl5vnCf4QB+fRQsfi6+AHb1Alpt6cPGK5KYhmdq5SpMpHUIctnEME/EFYg1xlzi782vBfm5oXZwKOAGCn/6qqaRPOdDgxKmra7OLP2XTr7DlOIRuiC2JrJgyweT7T6mJdu7LWjmmhJ1PCEn82lsPUMJ8j7yb+zPGnk6xSG5Ue99GyE6p0ElrACgPUAKyrKkaHwXbOr1kdvnYZBue5oiCIZ6EmCcnGebPpgxYk9SFzqGs5pObb1Q4OQGuatPOjA4pJBqZif6jAJn9HfKon4R2QX9ztGzOaK8x1pDfI2EK1ZHKxYUBMPpdwc5DuFjRQKBgQC2vulz05a6uJ5TCK+hqbWfMqveZg1V2PMEjPZ8yUiqsMg2Aux6jLz6b1ReFgpRQ6HESPZOM0hMa4SWQn0nwrZJw7MEdaE1Y1ew3pc4nCOWtH9F3PCuZMY/wy1+Mv/PFTdsPIHrxUvvDEbfd8lkYL8eI9H9fwl38kGu4qe08/va9wKBgQC6bLaJy4Br5VZSv78GprRtiW7pjxTuOMWNfqv/d0lwRRkLZtRipt4b2zJvUZCqJx2H2bBeRgSHEBi4tiPoVoJCeWCK5arAm6N9oNEnD32UN75+U2j1iZXVg5cjHbC1g55ZSnEHgdvsYxrgSM0roqtChJi4dSOxCCQJhCv4EXDzlwKBgCTD+fG8kumT9P5dlAAhRZH2vs8qluo7kIDM31YxpLX6hP0gz3TEVczIkx+urXq18Zis2SjYdmYxh2Y3kDhsmwHyJlTyWXGFQAIsdh4Eg8BxJd3nWmCrk5sGaGOoXQDLku/qqHTHp8Q7IxMYZWMVd73XlQq8ASqpiX9myDjGkVf3AoGAIxCluP9tFV5awU/Nt4uNrnjGQuolzrUg+39TDMc8KgDlOA7Mbg3jAyxUrTmTU13uIQpiMSlMWrc9XyjrUh1LfQNllFqkpnvf4ZZpIMa6ITHnA83elSie5T1OJU3FWi76juMApZ/YZPszJ/KpnMaJHgbgzvlBkF/un1ecCZoGO9sCgYEAncu0WXflBXXIpfPmz9up8Mcje5iuvWpEU+2DGfXLwgi24Yal4nkt55TXXE8/HGaC5W6+B+xswRxzX8v02S7HqqdY1EfR3QjA9RN+vYjn4ra+EwtTujgJOGyJrLp/SV/qp4LLo8FViZxDefmTeTTUvx0v/qidh+LAnn3Mo4EGh5M=-----END PRIVATE KEY-----";

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

function importPrivateKey(pem) {
  // fetch the part of the PEM string between header and footer
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length
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
      modulusLength: 1024,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign"]
  );
}

function App() {
  const [hash, setHash] = useState("");
  const [key, setKey] = useState();
  const [sign, setSign] = useState("");

  useEffect(() => {
    console.log("HELL #1");
    digestMessage("abc").then((hash) => setHash(hash));
    importPrivateKey(priv_key)
      .then((x) => {
        setKey(x);
        console.log("Key Changed", key);

        crypto.subtle
          .sign("RSASSA-PKCS1-v1_5", x, Buffer.from("secret data"))
          .then((sign) =>
            setSign(btoa(String.fromCharCode.apply(null, new Uint8Array(sign))))
          );
      })
      .catch((err) => console.error(err));
  }, []);

  /*
  
  importPrivateKey(priv_key).then((key) => {
    setKey(key);
    console.log("HELL");
    crypto.subtle
      .sign("RSASSA-PKCS1-v1_5", key, "secret data")
      .then((sign) => setSign(sign));
  });*/

  return (
    <div className="App">
      <header className="App-header">
        <p>Hash of abc is {hash}</p>
        <p>signature of "secret data" is {sign}</p>
      </header>
    </div>
  );
}

export default App;
