import { useState } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import styles from "../styles/Balance.module.scss";

import TextColumnGroup from "./TextColumnGroup";
import BalanceCardButton from "./BalanceCardButton";
import ReceiveModal from "./ReceiveModal";
import SendModal from "./SendModal";

function BalanceCard(props) {
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={receiveModalOpen}
        ariaHideApp={false}
        className={styles.modal_style}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setReceiveModalOpen(false)}
      >
        <ReceiveModal />
      </Modal>
      <Modal
        isOpen={sendModalOpen}
        ariaHideApp={false}
        className={styles.modal_style}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setSendModalOpen(false)}
      >
        <SendModal setOpen={() => setSendModalOpen(false)} />
      </Modal>
      <div className={`${styles.balance_card} flex_margin`}>
        <h3 className={styles.thold_title}>Balance Details</h3>
        <div>
          <TextColumnGroup
            class={styles.main_text_column}
            title="Current Balance"
            value={props.balance}
          />
          <div className={styles.flex_split}>
            <TextColumnGroup
              class={styles.mini_text_column}
              title="Lifetime Mined"
              value={props.mined}
            />
            <TextColumnGroup
              class={styles.mini_text_column}
              title="Lifetime Received"
              value={props.received}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <BalanceCardButton
            value={"Receive"}
            red={false}
            onClick={() => {
              setReceiveModalOpen(true);
            }}
          />
          <BalanceCardButton
            value={"Send"}
            red={true}
            onClick={() => {
              setSendModalOpen(true);
            }}
          />
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    balance: state.balance,
    mined: state.mined,
    received: state.received,
  };
}
export default connect(mapStateToProps)(BalanceCard);
