import { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";

import styles from "../styles/TransactionDrawer.module.scss";

import TransactionLI from "./TransactionLI";

function TransactionDrawer(props) {
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
        {props.transactions.slice(0, 5).map((element) => {
          return <TransactionLI {...element} />;
        })}
      </ul>
    </div>
  );
}

function mapStateToProps(state) {
  return { transactions: state.transactions };
}
export default connect(mapStateToProps)(TransactionDrawer);
