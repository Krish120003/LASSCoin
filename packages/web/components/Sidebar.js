import Router from "next/router";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Sidebar.module.scss";

import SidebarButton from "./SidebarButton";

export default function Sidebar() {
  const [currentPage, setCurrentPage] = useState(0);
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
      <Link href="/">
        <SidebarButton iconName="akar-icons:home" active={currentPage == 0} />
      </Link>
      <Link href="/transactions/">
        <SidebarButton
          iconName="radix-icons:activity-log"
          active={currentPage == 1}
        />
      </Link>
      <div className={styles.spacer}></div>
      <SidebarButton
        iconName="bx:bx-log-out"
        focus={true}
        onClick={() => {
          Router.reload(window.location.pathname);
        }}
      />
    </div>
  );
}
