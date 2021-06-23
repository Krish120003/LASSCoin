import { useDispatch, connect } from "react-redux";

import styles from "../../styles/index.module.scss";

import Sidebar from "../../components/Sidebar";
import TransactionDrawer from "../../components/TransactionDrawer";

export default function index() {
  const dispatch = useDispatch();

  dispatch({ type: "GET_TRANSACTIONS" });
  setInterval(() => dispatch({ type: "GET_TRANSACTIONS" }), 10000);

  return (
    <div className={styles.layout_t}>
      <Sidebar />
      <TransactionDrawer full={true}></TransactionDrawer>
    </div>
  );
}
