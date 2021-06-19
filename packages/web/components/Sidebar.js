import { Icon, InlineIcon } from "@iconify/react";
import coinIcon from "@iconify-icons/akar-icons/coin";

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
