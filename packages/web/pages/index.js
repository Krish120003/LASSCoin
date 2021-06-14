import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MyApp from './_app'
import BalanceCard from '../components/BalanceCard'
import Footer from '../components/Footer'

export default function Home() {
  return (
      <> 
        <Head> 
          <title> PAIN </title>
        </Head>
        <Footer/>
      </>
  )
};