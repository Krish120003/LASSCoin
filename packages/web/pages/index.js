import Head from "next/head";

import styles from "../styles/index.module.scss";

import Sidebar from "../components/Sidebar";
import BalanceCard from "../components/BalanceCard";
import StatStack from "../components/StatStack";

export default function Home() {
  return (
    <>
      <Head>
        <title>LASSCoin Home</title>
      </Head>
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.top_section}>
          <BalanceCard />
          <StatStack />
        </div>
      </div>
    </>
  );
}
