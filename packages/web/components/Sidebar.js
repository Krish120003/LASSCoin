import styles from "../styles/Sidebar.module.scss";

import SidebarButton from "./SidebarButton";

export default function Sidebar() {
  return (
    <div className={styles.main}>
      <SidebarButton />
      <SidebarButton />
      <SidebarButton />
    </div>
  );
}
