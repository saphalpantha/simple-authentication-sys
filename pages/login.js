import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { Fragment } from "react"
import LoginForm from "../login/LoginForm"
import { signIn } from "next-auth/react"
import styles from '../styles/Home.module.css'
import { connectToDataBase } from "../lib/db"
import { redirect } from "next/dist/server/api-utils"
const Login = (props) => {
  // const {data: sessions, loading} = useSession();
  const router = useRouter()



  
const googleSignHandler = (event) => {
  event.preventDefault()
  signIn('google')
}


const githubSignHandler = (event) => {
  event.preventDefault()
  signIn('github')
}

const facebookSignHandler = (event) => {
  event.preventDefault();
  signIn('facebook');
}



  if(props.session){
    router.replace('/');
    
  }
  return (
    <div className={styles.container} >
        <h1>Login</h1>
        <LoginForm githubSignHandler={githubSignHandler} googleSignHandler={googleSignHandler} facebookSignHandler={facebookSignHandler} />
    </div>
  )
}

export default Login;
export const getServerSideProps = async (context) => {
  const session = await getSession({req:context.req});

  if(session){
    const client = await connectToDataBase();
    if(!client){
      alert('Failed to Db');
    }
    const db = client.db();
    try{
      const users_collection = db.collection('_third_users')
      const user = await users_collection.findOne({email:session.user.email});
      if(!user){
        const result = await db.collection('_third_users').insertOne({email:session.user.email, name:session.user.name});
      }
    }
    catch(error){
      console.log('error in inserting db, ', error);
    }

    console.log('sucessfulll');
  }
  
  return{
    props:{session:session}
  }
}
