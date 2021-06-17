import Head from "next/head";

import styles from "../styles/index.module.scss";

import BalanceCard from "../components/BalanceCard";
import StatStack from "../components/StatStack";

export default function Home() {
  return (
    <div className={styles.layout}>
      <div className={styles.top_section}>
        <BalanceCard />
        <StatStack />
      </div>
    </div>
  );
}
