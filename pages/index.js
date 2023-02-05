import Head from 'next/head'
import Image from 'next/image'
import Form from '../login/Form'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      {/* <Form/> */}
      <strong> <h1 style={{color:'black'}}>AuthentiWeb</h1></strong>
      <section style={{border:'1px solid green' , width:'100%', padding:'15em 15em' , borderRadius:'20px', margin:'4 auto', textAlign:'center'}}>

       <strong> <h1 style={{color:'green', fontSize:'1.7rem'} }>Simple Login and Register Users</h1></strong>
      </section>
    </div>
  )
}
