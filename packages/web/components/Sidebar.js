import styles from "../styles/Sidebar.module.scss";

import SidebarButton from "./SidebarButton";

export default function Sidebar() {
  const currentPage = 0;
  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <span
          className="iconify"
          data-icon="akar-icons:coin"
          data-inline="false"
          data-width="3em"
          style={{ color: "#5C4E7A" }}
        ></span>
      </div>
      <SidebarButton iconName="akar-icons:home" active={currentPage == 0} />
      <SidebarButton
        iconName="radix-icons:activity-log"
        active={currentPage == 1}
      />
      <SidebarButton iconName="bx:bx-log-out" focus={true} />
    </div>
  );
}
