import styles from "../styles/LoadCreateKey.module.scss";

export default function LoadCreateKey() {
  const load_key = async (event) => {
    event.preventDefault();
    const file_reader = new FileReader();
    file_reader.onload = async (event) => {
      console.log(event.target.result);
    };
    file_reader.readAsText(event.target.files[0]);
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
            onChange={(event) => {load_key(event)}}
          ></input>
        </div>
        <div className={styles.create_btn}>
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
