import {
  importPrivateKey,
  generatePrivateKey,
  exportPrivatePem,
} from "../util/Crypto";
import { useDispatch } from "react-redux";
import { saveAs } from "file-saver";

import styles from "../styles/LoadCreateKey.module.scss";

export default function LoadCreateKey() {
  const dispatch = useDispatch();

  const load_key = async (event) => {
    event.preventDefault();
    const file_reader = new FileReader();
    file_reader.onload = async (event) => {
      const key = await importPrivateKey(event.target.result);
      dispatch({ type: "SET_PRIV_KEY", payload: { key: key } });
    };
    file_reader.readAsText(event.target.files[0]);
  };

  const create_key = async () => {
    const key = await generatePrivateKey();
    const keyPem = await exportPrivatePem(key);
    const blob = new Blob([keyPem], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "private.key");
    setTimeout(() => {
      dispatch({ type: "SET_PRIV_KEY", payload: { key: key } });
    }, 1000);
  };

  return (
    <div className={styles.main}>
      <div className={styles.title_div}>
        <div>WELCOME TO LASSCoin</div>
      </div>

      <div className={styles.content}>
        <div className={styles.load_btn}>
          <div
            className={styles.load_btn_content}
            onClick={() => {
              document.getElementById("load_key_dialog").click();
            }}
          >
            <span
              className="iconify"
              data-icon="bi:cloud-upload"
              data-inline="false"
            ></span>
            <h3>LOAD KEY</h3>
          </div>
          <input
            className={styles.hidden_cover_input}
            id="load_key_dialog"
            type="file"
            onChange={(event) => {
              load_key(event);
            }}
          ></input>
        </div>
        <div
          className={styles.create_btn}
          onClick={() => {
            create_key();
          }}
        >
          <span
            className="iconify"
            data-icon="ic:outline-vpn-key"
            data-inline="false"
          ></span>
          <h3>CREATE KEY</h3>
        </div>
      </div>
    </div>
  );
}
