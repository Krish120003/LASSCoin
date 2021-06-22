import { useState } from "react";
import { generateUUID4String, digestMessage } from "../util/Crypto";
import styles from "../styles/SendModal.module.scss";
import React from "react";
import { connect } from "react-redux";

function SendModal(props) {
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState(0);

  const createTransaction = async () => {
    const id = generateUUID4String();
    const sender = props.public_key;
    const value = parseFloat(amount);
    const message = `${id}|${sender}|${target}|${value.toFixed(15)}`;
    console.log(message, digestMessage(message));
  };

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
          <div className={styles.send} onClick={() => createTransaction()}>
            Send
          </div>
          <div className={styles.close} onClick={() => props.setOpen()}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(SendModal);
