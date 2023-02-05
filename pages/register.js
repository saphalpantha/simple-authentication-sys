import Head from 'next/head'
import Image from 'next/image'
import Form from '../login/Form'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      {/* <Form/> */}
      <h1>Register</h1>
      <Form/>
    </div>
  )
}
