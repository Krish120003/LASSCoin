import styles from "../styles/SidebarButton.module.scss";

export default function SidebarButton(props) {
  return <div className={styles.main}>{props.children}</div>;
}
