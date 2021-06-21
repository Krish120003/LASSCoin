import {useState} from "react";
import Modal from "react-modal";

import styles from "../styles/Balance.module.scss";

import TextColumnGroup from "./TextColumnGroup";
import BalanceCardButton from "./BalanceCardButton";
import ReceiveModal from "./ReceiveModal";

export default function BalanceCard() {

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
      <div className={`${styles.balance_card} flex_margin`}>
        <h3 className={styles.thold_title}>Balance Details</h3>
        <div>
          <TextColumnGroup
            class={styles.main_text_column}
            title="Current Balance"
            value={2.25002}
          />
          <div className={styles.flex_split}>
            <TextColumnGroup
              class={styles.mini_text_column}
              title="Lifetime Mined"
              value={3.25}
            />
            <TextColumnGroup
              class={styles.mini_text_column}
              title="Lifetime Received"
              value={0.00002}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <BalanceCardButton value={"Receive"} red={false} onClick={() => {setReceiveModalOpen(true)}}/>
          <BalanceCardButton value={"Send"} red={true} />
        </div>
      </div>
    </>
  );
}
