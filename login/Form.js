import React, { use, useState } from "react";
import { headers } from "../next.config";
import {signIn} from "next-auth/react"
import classes from "./Form.module.css";
const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const createUser = async (email, password) =>{
  const response = await fetch('/api/auth/signUp',{
    method:'POST',
    body:JSON.stringify({email, password}),
    headers:{
      'Content-Type':'application/json',
    }
  })

  const data = await response.json();
  if(!response.ok){
    alert('No response ok');
  }
  return data;
} 

  const emailChangeHander = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHander = (event) => {
    setPassword(event.target.value);
  };


const submitHandler = async (event) => {
  event.preventDefault();

  try{

    const result =  await createUser(email,password);
    console.log(result)
  }
  catch(error){
    alert('errror', error);
  }



}
  return (
    <div className={classes.main}>
      <form onSubmit={submitHandler} className={classes.form}>
        <input
          type="email"
          
          placeholder="Enter Your Valid email "
          onChange={emailChangeHander}
        />
        <input
          type="password"
          placeholder="Your Password"
          onChange={passwordChangeHander}
          />
        <button>Submit</button>

        
      </form>

    </div>
  );
};

export default Form;


