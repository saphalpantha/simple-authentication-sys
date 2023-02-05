import React from 'react'
import { useState } from 'react';
import classes from "./Form.module.css"
const ChangeUser = () => {



    const [oldPassword, setEmail] = useState("");
    const [newPassword, setPassword] = useState("");
  
  
    const emailChangeHander = (event) => {
      setEmail(event.target.value);
    };
  
    const passwordChangeHander = (event) => {
      setPassword(event.target.value);
    };




    const submitHandler = async (event) => {
        const passwordData = {
            oldPassword:oldPassword,
            newPassword:newPassword,
        }
        event.preventDefault();
        const response = await fetch('/api/users/change-password', {
            method:'PATCH',
            body:JSON.stringify(passwordData),
            headers:{
                'Content-Type':'application/json',
            }
        })

        const data = await response.json();
        console.log(data);
      } 
  return (



    <div className={classes.main}>
        <h1>Change Users Profile</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <input
          type="password"
          placeholder="Old Password"
          onChange={emailChangeHander}
        />
        <input
          type="password"
          placeholder="New Password"
          onChange={passwordChangeHander}
          />
        <button>Change PASSWORD</button>
      </form>
    </div>
  )
}

export default ChangeUser