import styles from "../styles/LoadCreateKey.module.scss";

export default function LoadCreateKey() {
  return (
    <div className={styles.main}>
      <div className={styles.title_div}>
        <div>WELCOME TO LASSCoin</div>
      </div>

      <div className={styles.content}>
        <div className={styles.load_btn}>
          <span
            class="iconify"
            data-icon="bi:cloud-upload"
            data-inline="false"
          ></span>
          <h3>LOAD KEY</h3>
        </div>
        <div className={styles.create_btn}>
          <span
            class="iconify"
            data-icon="ic:outline-vpn-key"
            data-inline="false"
          ></span>
          <h3>CREATE KEY</h3>
        </div>
      </div>
    </div>
  );
}
