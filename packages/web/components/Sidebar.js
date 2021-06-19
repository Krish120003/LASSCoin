import styles from "../styles/Sidebar.module.scss";

import SidebarButton from "./SidebarButton";

export default function Sidebar() {
  return (
    <div className={styles.main}>
      <div>
        <span
          class="iconify"
          data-icon="akar-icons:coin"
          data-inline="false"
        ></span>
      </div>
      <SidebarButton>
        <span
          class="iconify"
          data-icon="akar-icons:home"
          data-inline="false"
        ></span>
      </SidebarButton>
      <SidebarButton />
      <SidebarButton />
    </div>
  );
}
