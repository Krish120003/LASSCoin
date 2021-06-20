import { useState, useEffect } from "react";
import "crypto";


function FileProcessor(priv_key) {
  alert('TEST')

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
  
    return (
      <div className="App">
        <header className="App-header">
          <p>Hash of abc is {hash}</p>
          <p>signature of "secret data" is {sign}</p>
        </header>
      </div>
    );
  }
}

export default function FileUploader() {
  const [priv_key, setpriv_key] = useState("");

  const readFile = async (e) => {
    e.preventDefault();
    const file_reader = new FileReader();
    file_reader.onload = async (e) => {
      setpriv_key(e.target.result);
      console.log(e.target.result);
    };
    file_reader.readAsText(e.target.files[0]);
  };

  return (
    <div>
      <label>Upload Your Private Key File </label>
      <input
        type="file"
        onChange={(e) => {
          readFile(e).then(() =>{FileProcessor(priv_key)});
        }}
      />
      <p>
        The key is: <br /> {priv_key}
      </p>
    </div>
  );
}

