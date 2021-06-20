import styles from "../styles/TransactionLI.module.scss";

export default function TransactionLI(props) {
  return (
    <li className={styles.main}>
      <span className={styles.left}>
        <h6>Height {props.height}</h6>
        <p>{props.timestamp}</p>
      </span>
      <span className={styles.right}>
        {props.value ? props.value.toFixed(14) : ""}
      </span>
    </li>
  );
}
