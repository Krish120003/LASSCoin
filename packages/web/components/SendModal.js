import { useState } from "react";
import { generateUUID4String, signMessage } from "../util/Crypto";
import styles from "../styles/SendModal.module.scss";
import React from "react";
import { connect } from "react-redux";

function SendModal(props) {
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState(0);

  const createTransaction = async () => {
    const API_URL = "https://lasscoin.herokuapp.com/api";

    const id = "a31c1ead-52c8-41b9-b24b-e1e79f443c7d"; //generateUUID4String();
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
      body: JSON.stringify(data),
    });
    console.log(JSON.stringify(data), res, await res.json());
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
