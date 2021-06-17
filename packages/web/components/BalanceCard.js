import styles from "../styles/Balance.module.scss";
import TextColumnGroup from "./TextColumnGroup";
import BalanceCardButton from "./BalanceCardButton";

export default function BalanceCard() {
  return (
    <div className={styles.balance_card}>
      <h3 className={styles.thold_title}>Balance Details</h3>
      <div>
        <TextColumnGroup title="Current Balance" value={2.2500200}/>
        <div>
          <TextColumnGroup title="Lifetime Mined" value={3.2500000}/>
          <TextColumnGroup title="Lifetime Received" value={0.0000200}/>
        </div>
      </div>
      <div className={styles.buttons}>
        <BalanceCardButton value={"Receive"} red={false} />
        <BalanceCardButton value={"Send"} red={true} />
      </div>
    </div>
  );
}
