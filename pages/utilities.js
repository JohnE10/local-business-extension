import Head from "next/head";
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const utilities = () => {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Utitlity Scripts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='main'>

        <div className='pageTitle'><h4>Functionality List</h4></div>
        <div><Link href='/wordPressChecker'><p>Check if website is wordpress</p></Link></div>
        <div><Link href='/getNavLinks'><p>Get navigation menu links</p></Link></div>
        <div><Link href='/createPage'><p>Create page</p></Link></div>
        <div><Link href='/pageHead'><p> Get Page Head</p></Link></div>
        <div><Link href='/getCss'><p>Get website CSS</p></Link></div>
        <div><Link href='/googlePageSpeedInsights'><p>Google PageSpeed Insights</p></Link></div>
        <div><Link href='/searchDatabase'><p>Search database</p></Link></div>
        <div><Link href='/manualDeletePage'><p>Delete from database</p></Link></div>
        <div><Link href='/downloadAllImages'><p>Download All Images</p></Link></div>
        
      </div>
    </>
  )
}

export default utilities;
