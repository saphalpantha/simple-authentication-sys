import React, { use, useState } from "react";
import {signIn, useSession} from "next-auth/react"
import classes from "./Form.module.css";
import Link from "next/link";
const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
;
  const emailChangeHander = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHander = (event) => {
    setPassword(event.target.value);
  };







const submitHandler = async (event) => {
  event.preventDefault();

  const results = await signIn('credentials', {
    redirect:false,
    email:email,
    password:password
  })


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
        <span style={{display:'flex', justifyContent:'space-around'}}>
        <button>Login</button>
        <button><Link href='/register'>Create New Account</Link></button>

        </span>
        <h1><strong>OR</strong></h1>

        <section className={classes.third}>

        <div>
    <span>
      <button onClick={props.googleSignHandler} className={classes.extra}>
      Sign In with Google
      </button>
      </span>
        </div>
        <div>
    <span>
      <button onClick={props.githubSignHandler} className={classes.extra}>
      Sign In with Github
      </button>
      </span>
    <span>
      <button onClick={props.facebookSignHandler} className={classes.extra}>
      Sign In with Facebook
      </button>
      </span>
        </div>
        </section>
      </form>
    </div>
  );
};

export default LoginForm;


