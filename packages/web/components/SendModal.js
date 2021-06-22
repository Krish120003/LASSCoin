import { useState } from "react";

import styles from "../styles/SendModal.module.scss";
import React from "react";

export default function SendModal(props) {
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h3 className={styles.title}>Send LASSCoin</h3>
        <div className={styles.inputs}>
          <label>
            <p>Address</p>
          </label>
          <input
            type="text"
            onChange={(e) => {
              setTarget(e.target.value);
            }}
          ></input>
          <label>
            <p>Amount</p>
          </label>
          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            min={0}
          ></input>
        </div>
        <div className={styles.buttons}>
          <div className={styles.send}>Send</div>
          <div className={styles.close} onClick={() => props.setOpen()}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}
