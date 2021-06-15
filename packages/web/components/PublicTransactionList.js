import {useState} from "react";

export default function PublicTransactionList() {
    const [PublicTransactions, setPublicTransactions] = useState(0);

    return (
        <div>
            <h4> Example Transaction </h4>
            <PublicTransactions/>
        </div>
    )
}
