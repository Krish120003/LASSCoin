import {useState} from "react";


export default function UserTransactionList(props) {
    const [PublicTransactions, setPublicTransactions] = useState(0);
    
    //example cause no fluid data
    const exampletransactions = ["1111","2222","3333","4444"]
    const exampletransactionslist = exampletransactionslist.map ((extransactions) => extransactions * 2);

    return (
        <div>
            <h4> Example Transaction </h4>
            {exampletransactionslist}
        </div>
    )
}
