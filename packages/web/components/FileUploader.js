import { useState } from "react";


function FileProcessor(key) {
  alert(key);
}

export default function FileUploader() {
  const [key, setKey] = useState("");

  const readFile = async (e) => {
    e.preventDefault();
    const file_reader = new FileReader();
    file_reader.onload = async (e) => {
      setKey(e.target.result);
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
          readFile(e).then(() =>{FileProcessor(key)});
        }}
      />
      <p>
        The key is: <br /> {key}
      </p>
    </div>
  );
}

