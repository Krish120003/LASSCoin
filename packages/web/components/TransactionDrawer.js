import { useState } from "react";

import styles from "../styles/TransactionDrawer.module.scss";

import TransactionLI from "./TransactionLI";

const props = {
  height: 546546,
  value: 32.4,
  timestamp: 1624049721,
};

export default function TransactionDrawer() {
  const [filter, setFilter] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.option_container}>
        <span
          className={filter ? "" : styles.active_option}
          onClick={() => {
            setFilter(false);
          }}
        >
          Transactions
        </span>
        <span
          className={!filter ? "" : styles.active_option}
          onClick={() => {
            setFilter(true);
          }}
        >
          My Transactions
        </span>
      </div>
      <ul className={styles.transactions}>
        <TransactionLI {...props}></TransactionLI>
        <TransactionLI {...props}></TransactionLI>
        <TransactionLI {...props}></TransactionLI>
        <TransactionLI {...props}></TransactionLI>
        <TransactionLI {...props}></TransactionLI>
      </ul>
    </div>
  );
}
