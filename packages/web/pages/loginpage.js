import Head from "next/head";

import styles from "../styles/index.module.scss";

import BalanceCard from "../components/BalanceCard";
import StatStack from "../components/StatStack";
import FileUploader from "../components/FileUploader";
import Crypto from "../components/Crypto";


export default function Home() {
  return (
    <div className={styles.layout}>
      <h1> Private Key Login</h1>
      <Crypto/>
    </div>
  );
}
