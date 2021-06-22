import styles from "../styles/ReceiveModal.module.scss";

export default function ReceiveModal() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.center}>
          <h3>Receive LASSCoin</h3>
          <div className={styles.address_box}>
            <div id="public_key_copy" className={styles.key_box}>
              MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxhrRjWzQUKHLOve5TPOd3dE0WUg1gSws9bdT1U2yBxBRGZevxSIe1R25E9TcbMCim8pj1fPjmJh0Z3RsDuOxQxFQe
            </div>
            <div
              className={styles.copy_button}
              onClick={() => {
                function selectText(node) {
                  node = document.getElementById(node);

                  if (document.body.createTextRange) {
                    const range = document.body.createTextRange();
                    range.moveToElementText(node);
                    range.select();
                  } else if (window.getSelection) {
                    const selection = window.getSelection();
                    const range = document.createRange();
                    range.selectNodeContents(node);
                    selection.removeAllRanges();
                    selection.addRange(range);
                  } else {
                    console.warn(
                      "Could not select text in node: Unsupported browser."
                    );
                  }
                }
                selectText("public_key_copy");
                document.execCommand("copy");
              }}
            >
              Copy
            </div>
          </div>
          <p>
            This is your public address that can be used by others to send you
            LASSCoin.
          </p>
        </div>
      </div>
    </div>
  );
}
