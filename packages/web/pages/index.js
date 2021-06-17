import Head from "next/head";
import BalanceCard from "../components/BalanceCard";

import styles from "../styles/index.module.scss";

export default function Home() {
  return (
    <div className={styles.layout}>
      <BalanceCard />
    </div>
  );
}

