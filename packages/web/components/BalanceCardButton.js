import styles from "../styles/BalanceCardButton.module.scss";

export default function BalanceCardButton(props) {
  return (
    <div
      className={!props.red ? styles.button : `${styles.button} ${styles.red}`}
      onClick={props.onClick}
    >
      <p className={styles.button_text}>{props.value}</p>
    </div>
  );
}
