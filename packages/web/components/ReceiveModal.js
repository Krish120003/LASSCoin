import styles from "../styles/ReceiveModal.module.scss";

export default function ReceiveModal() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h3>Receive LASSCoin</h3>
        <div className={styles.address_box}>
          <div className={styles.key_box}>
            MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxhrRjWzQUKHLOve5TPOd3dE0WUg1gSws9bdT1U2yBxBRGZevxSIe1R25E9TcbMCim8pj1fPjmJh0Z3RsDuOxQxFQe
          </div>
          <div className={styles.copy_button}>Copy</div>
        </div>
        <p>
          This is your public address that can be used by others to send you
          LASSCoin.
        </p>
      </div>
    </div>
  );
}
