import Head from "next/head";
import Modal from "react-modal";

import styles from "../styles/index.module.scss";

import Sidebar from "../components/Sidebar";
import BalanceCard from "../components/BalanceCard";
import StatStack from "../components/StatStack";
import TransactionDrawer from "../components/TransactionDrawer";
import LoadCreateKey from "../components/LoadCreateKey";

export default function Home() {
  return (
    <>
      <Head>
        <title>LASSCoin Home</title>
      </Head>
      <Modal isOpen={true} ariaHideApp={false} className={styles.modal_style}>
        <LoadCreateKey />
      </Modal>
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.top_section}>
          <BalanceCard />
          <StatStack />
        </div>
        <div>
          <TransactionDrawer />
        </div>
      </div>
    </>
  );
}
