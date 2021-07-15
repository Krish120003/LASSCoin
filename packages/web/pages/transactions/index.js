import { useDispatch, connect } from "react-redux";
import { useEffect } from "react";
import styles from "../../styles/index.module.scss";

import Sidebar from "../../components/Sidebar";
import TransactionDrawer from "../../components/TransactionDrawer";

export default function index() {
  const dispatch = useDispatch();

  dispatch({ type: "GET_TRANSACTIONS" });
  dispatch({ type: "GET_HEIGHT" });

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "GET_TRANSACTIONS" });
    }, 1000);
    const secondIntervalId = setInterval(() => {
      dispatch({ type: "GET_HEIGHT" });
    }, 10000);
    return () => {
      clearInterval(intervalId);
      clearInterval(secondIntervalId);
    };
  }, []);

  return (
    <div className={styles.layout_t}>
      <Sidebar />
      <TransactionDrawer full={true}></TransactionDrawer>
    </div>
  );
}
