import styles from "../styles/TransactionLI.module.scss";

import { formatDate } from "../util/parseTime";

export default function TransactionLI(props) {
  return (
    <li className={props.self ? styles.main_self : styles.main}>
      <span className={styles.left}>
        <div className={props.self ? styles.organe_icon : styles.icon}>
          <span
            className={"iconify"}
            data-icon="grommet-icons:transaction"
            data-inline="false"
          ></span>
        </div>
        <div className={styles.left_text}>
          <h6>Height {props.height}</h6>
          <p>{formatDate(props.time * 1000, "d MMM yyyy H:mm:ss")}</p>
        </div>
      </span>
      <span className={styles.right}>
        L$ {props.value != null ? props.value.toFixed(14) : ""}
      </span>
    </li>
  );
}
