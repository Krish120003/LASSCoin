import {useState} from "react";
import styles from "../styles/Transactions.module.scss";
import data from "./TransactionData";




export default function PublicTransactionList(props) {
    const [PublicTransactions, setPublicTransactions] = useState(0);
    
    //example cause no fluid data
    // const extransactions = ["1111","2222","3333","4444"]
    console.log(data);
    return (
        <div>
            <h4> User Transaction </h4>
            <ul className={styles.styled_list}>
              {
                  data.map(x => {
                      return <li key={x.uuid}>{x.height} {x.time} {x.value}</li>
                  })
              }  
            </ul>

        </div>
    )
}
