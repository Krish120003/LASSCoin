import Head from 'next/head'
import Image from 'next/image'
import MyApp from './_app'
import BalanceCard from '../components/BalanceCard'
import PublicTransactionList from '../components/PublicTransactionList'
import UserTransactionList from '../components/UserTransactionList'


export default function Home() {
  return (
      <> 
        <Head> 
          <title> PAIN </title>
        </Head>
        <PublicTransactionList/>
        <UserTransactionList/>
      </>
  )
};