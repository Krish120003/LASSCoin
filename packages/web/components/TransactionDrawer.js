import { useState } from "react";

import styles from "../styles/TransactionDrawer.module.scss";

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
    </div>
  );
}
