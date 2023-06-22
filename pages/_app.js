import '../styles/globals.css'
import Layout from "../components/Layout";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import '../styles/style.min3781.css';
import '../styles/classic-themes.min3781.css';
import '../styles/style3781.css';
import '../styles/style810f.css';
import '../styles/dashicons.min3781.css';
import '../styles/et-divi-customizer-global-1682564637993.min.css';
import '../styles/mediaelementplayer-legacy.min1f61.css';
import '../styles/wp-mediaelement.min3781.css';

// between pages loading indicator
function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const handleStart = (url) => (url !== router.asPath) && setLoading(true);
  //   const handleComplete = (url) => (url === router.asPath) && setLoading(false);

  //   router.events.on('routeChangeStart', handleStart)
  //   router.events.on('routeChangeComplete', handleComplete)
  //   router.events.on('routeChangeError', handleComplete)

  //   return () => {
  //     router.events.off('routeChangeStart', handleStart)
  //     router.events.off('routeChangeComplete', handleComplete)
  //     router.events.off('routeChangeError', handleComplete)
  //   }
  // })

  return loading && (
    <div className='text-center fs-5 mt-5'>...Loading</div>
  )
}

function MyApp({ Component, pageProps }) {

  return (
    <>
          <Layout>
            <>
              {/* <Loading /> */}

              <Component {...pageProps} />

            </>
          </Layout>
    </>
  )

}

export default MyApp


