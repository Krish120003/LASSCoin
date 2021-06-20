import { useState } from "react";

import styles from "../styles/TransactionDrawer.module.scss";

import TransactionLI from "./TransactionLI";

const props = {
  height: 420,
  value: 69.42,
  timestamp: 1624170294,
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
        <TransactionLI></TransactionLI>
        <TransactionLI></TransactionLI>
      </ul>
    </div>
  );
}
