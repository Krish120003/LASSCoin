import StatCard from "./StatCard";

export default function StatStack() {
  return (
    <div>
      <h2>BLOCKCHAIN STATS</h2>
      <div>
        <StatCard title={"Height"} value={1337} />
        <StatCard title={"Height"} value={1337} />
      </div>
    </div>
  );
}
