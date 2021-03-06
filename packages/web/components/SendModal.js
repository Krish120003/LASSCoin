import { useState } from "react";
import { generateUUID4String, signMessage } from "../util/Crypto";
import styles from "../styles/SendModal.module.scss";
import React from "react";
import { connect, useDispatch } from "react-redux";

function SendModal(props) {
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  const createTransaction = async () => {
    const API_URL = "https://lasscoin.herokuapp.com/api";

    const id = generateUUID4String();
    const sender = props.public_key;
    const value = parseFloat(amount);
    const message = `${id}|${sender}|${target}|${value.toFixed(15)}`;
    const signature = await signMessage(message, props.private_key);
    const data = {
      sender: sender,
      target: target,
      value: value,
      uuid: id,
      signature: signature,
    };
    const res = await fetch(API_URL + "/transactions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    dispatch({ type: "GET_TRANSACTIONS" });
    dispatch({ type: "GET_HEIGHT" });
    dispatch({ type: "GET_PENDING" });
    dispatch({ type: "GET_BALANCE_DETAILS" });
    props.setOpen();
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
