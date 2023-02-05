import { SessionProvider } from 'next-auth/react'
import { Fragment } from 'react'
import Header from '../login/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps:{session, ...pageProps} }) {
  return <Fragment>

    <SessionProvider session={session} refetchInterval={5*60}>

    <Header/>

    <Component {...pageProps} />
    </SessionProvider>
    </Fragment>
}

export default MyApp
