import styles from "../styles/TransactionLI.module.scss";

import { formatDate } from "../util/parseTime";

export default function TransactionLI(props) {
  return (
    <li className={styles.main}>
      <span className={styles.left}>
        <h6>Height {props.height}</h6>
        <p>{formatDate(props.timestamp * 1000, "d MMM yyyy H:mm:ss")}</p>
      </span>
      <span className={styles.right}>
        L$ {props.value ? props.value.toFixed(14) : ""}
      </span>
    </li>
  );
}
