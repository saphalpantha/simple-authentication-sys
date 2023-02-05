import { getSession } from 'next-auth/react'
import React from 'react'
import ChangeUser from '../login/ChangeUser'

const UserProfile = () => {

  return (
    <ChangeUser/>
  )
}



export default UserProfile

export const getServerSideProps =  async (context) => {
  const session =await  getSession({req:context.req})
  if(!session){
    return{
      redirect:{
        destination:'/',
        permanent:true,
      }
    }
  }
  return{
    props:{
      session,
    }
  }

}