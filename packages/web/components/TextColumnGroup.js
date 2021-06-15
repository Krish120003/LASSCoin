import { useState } from "react";

export default function TextColumnGroup() {
  const [currentBalance, setCurrentBalance] = useState(0);

  return (
    <div>
      <h4>L$ 0.00002 {} </h4>
      <p>Current Balance etc</p>
    </div>
  );
}
