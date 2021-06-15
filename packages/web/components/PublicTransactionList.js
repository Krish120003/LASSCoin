import {useState} from "react";


export default function PublicTransactionList(props) {
    const [PublicTransactions, setPublicTransactions] = useState(0);
    
    //example cause no fluid data
    const extransactions = ["1111","2222","3333","4444"]
    const extransactionslist = extransactions.map ((extransactions) => extransactions * 2);

    return (
        <div>
            <h4> Example Transaction </h4>
            {extransactions}
        </div>
    )
}
