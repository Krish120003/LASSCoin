import styles from "../styles/SidebarButton.module.scss";

export default function SidebarButton(props) {
  return (
    <div className={styles.main}>
      {props.children}
      <span
        className="iconify"
        data-icon={props.iconName}
        data-inline="false"
        data-width="45%"
      ></span>
    </div>
  );
}
