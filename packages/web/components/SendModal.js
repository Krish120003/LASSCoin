import { useState } from "react";

import styles from "../styles/SendModal.module.scss";
import React from "react";

export default function SendModal() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <input type="number"></input>
      </div>
    </div>
  );
}
