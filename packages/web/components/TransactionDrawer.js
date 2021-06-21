import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "../styles/TransactionDrawer.module.scss";

import TransactionLI from "./TransactionLI";

export default function TransactionDrawer() {
  const [filter, setFilter] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_TRANSACTIONS" });
  }, []);

  const transactions = useSelector((state) => state.transactions);

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
        {transactions.slice(0, 5).map((element) => {
          console.log("H", element);
          return <TransactionLI {...element} />;
        })}
      </ul>
    </div>
  );
}
