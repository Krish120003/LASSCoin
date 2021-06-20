import { useState } from "react";

import styles from "../styles/TransactionDrawer.module.scss";

export default function TransactionDrawer() {
  const [filter, setFilter] = useState(false);

  return (
    <div>
      <div>
        <span>Option 1</span>
        <span>Option 2</span>
      </div>
    </div>
  );
}
