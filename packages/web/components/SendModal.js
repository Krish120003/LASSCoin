import { useState } from "react";

import styles from "../styles/SendModal.module.scss";
import React from "react";

export default function SendModal() {
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <input
          type="text"
          onChange={(e) => {
            setTarget(e.target.value);
          }}
        ></input>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        ></input>
      </div>
    </div>
  );
}
