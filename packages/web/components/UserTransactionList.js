import {useState} from "react";
import styles from "../styles/Transactions.module.scss";

export default function PublicTransactionList(props) {
    const [PublicTransactions, setPublicTransactions] = useState(0);
    
    //example cause no fluid data
    const extransactions = ["1111","2222","3333","4444"]
    const extransactionslist = extransactions.map ((extransactions) => extransactions * 2);

    return (
        <div>
            <h4> Public Transaction </h4>
            <ul className={styles.styled_list}>
              {
                  extransactions.map(x => {
                      return <li>{x}</li>
                  })
              }  
            </ul>

        </div>
    )
}
