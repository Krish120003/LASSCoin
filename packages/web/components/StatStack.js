import StatCard from "./StatCard";

import styles from "../styles/StatStack.module.scss";

export default function StatStack() {
  return (
    <div className={styles.stat_stack}>
      <h2 classNa>BLOCKCHAIN STATS</h2>
      <div>
        <StatCard title={"Height"} value={1337} />
        <StatCard title={"Height"} value={1337} />
      </div>
    </div>
  );
}
