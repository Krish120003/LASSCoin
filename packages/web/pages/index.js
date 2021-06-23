import Head from "next/head";
import Modal from "react-modal";

import { useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import styles from "../styles/index.module.scss";

import Sidebar from "../components/Sidebar";
import BalanceCard from "../components/BalanceCard";
import StatStack from "../components/StatStack";
import TransactionDrawer from "../components/TransactionDrawer";
import LoadCreateKey from "../components/LoadCreateKey";

function Home(props) {
  const dispatch = useDispatch();

  dispatch({ type: "GET_TRANSACTIONS" });
  dispatch({ type: "GET_HEIGHT" });
  dispatch({ type: "GET_PENDING" });
  dispatch({ type: "GET_BALANCE_DETAILS" });

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "GET_TRANSACTIONS" });
      dispatch({ type: "GET_HEIGHT" });
      dispatch({ type: "GET_PENDING" });
      dispatch({ type: "GET_BALANCE_DETAILS" });
    }, 10000);
    return () => {
      console.log("Unmounting");
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Head>
        <title>LASSCoin Home</title>
      </Head>
      <Modal
        isOpen={props.private_key == null}
        ariaHideApp={false}
        className={styles.modal_style}
      >
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

function mapStateToProps(state) {
  return { private_key: state.private_key };
}
export default connect(mapStateToProps)(Home);
