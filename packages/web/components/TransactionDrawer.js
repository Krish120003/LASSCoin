import { useState } from "react";
import { connect } from "react-redux";

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
        {props.transactions
          .filter((t) => {
            if (!filter) {
              return true;
            } else {
              return (
                t.sender === props.public_key || t.target === props.public_key
              );
            }
          })
          .slice(0, 5)
          .map((element) => {
            return (
              <TransactionLI
                key={element.uuid}
                {...element}
                self={
                  element.sender === props.public_key ||
                  element.target === props.public_key
                }
              />
            );
          })}
      </ul>
    </div>
  );
}

function mapStateToProps(state) {
  return { transactions: state.transactions, public_key: state.public_key };
}
export default connect(mapStateToProps)(TransactionDrawer);
