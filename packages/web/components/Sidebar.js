import { Icon, InlineIcon } from "@iconify/react";
import coinIcon from "@iconify-icons/akar-icons/coin";

import styles from "../styles/Sidebar.module.scss";

import SidebarButton from "./SidebarButton";

export default function Sidebar() {
  return (
    <div className={styles.main}>
      <Icon
        icon={coinIcon}
        width="3em"
        color="#5C4E7A"
        style={{ "margin-bottom": "4em", "margin-left": "0.5em" }}
      />
      <SidebarButton />
      <SidebarButton />
      <SidebarButton />
    </div>
  );
}
