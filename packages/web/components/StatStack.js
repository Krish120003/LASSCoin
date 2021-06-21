import StatCard from "./StatCard";
import { connect } from "react-redux";

import styles from "../styles/StatStack.module.scss";

function StatStack(props) {
  return (
    <div className={`${styles.stat_stack} flex_margin`}>
      <h2>BLOCKCHAIN STATS</h2>
      <div>
        <StatCard title={"Height"} value={props.height} />
        <StatCard title={"Pending Blocks"} value={props.pendingBlocks} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { height: state.height, pendingBlocks: state.pendingBlocks};
}
export default connect(mapStateToProps)(StatStack);
