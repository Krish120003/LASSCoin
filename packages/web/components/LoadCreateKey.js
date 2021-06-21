import styles from "../styles/LoadCreateKey.module.scss";

export default function LoadCreateKey() {
  return (
    <div className={styles.main}>
      <div className={styles.title_div}>
        <div>WELCOME TO LASSCoin</div>
      </div>

      <div className={styles.content}>
        <div className={styles.load_btn}></div>
        <div className={styles.create_btn}></div>
      </div>
    </div>
  );
}
