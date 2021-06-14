import styles from "../styles/Balance.module.scss";
import TextColumnGroup from "./TextColumnGroup";
import BalanceCardButton from "./BalanceCardButton";

export default function BalanceCard() {
  return (
    <div className={styles.balance_card}>
      <h3 className={styles.thold_title}>Balance Details</h3>
      <TextColumnGroup />
      <div className={styles.buttons}>
        <BalanceCardButton value={"Receive"} red={false} />
        <BalanceCardButton value={"Send"} red={true} />
      </div>
    </div>
  );
}
