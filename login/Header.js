import Link from 'next/link'
import React from 'react'
import classes from './Header.module.css'
import {useSession, signOut} from 'next-auth/react'
const Header = () => {
    const {data:session, status} = useSession();
    const logoutHandler = (event) => {
        event.preventDefault();
        signOut()
    }
    return (

    <div className={classes.header}>
        <nav>
            <ul >
                <li>
                    <Link href="/">Home </Link>
                </li>
                {session && <li>
                    <Link href="/UserProfile">Profile </Link>
                    
                </li>
                }
                <li>
                    { session ? <button className={classes.button} onClick={logoutHandler}>LogOut </button> : <Link href="/login">Sign In </Link>}
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Header