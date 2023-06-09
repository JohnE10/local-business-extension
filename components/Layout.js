import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"></link> */}
            </Head>

            <div className="main">
                <Navbar />
                {children}
                <Footer />
            </div>
            {/* <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></Script> */}

        </>

    );
}

export default Layout;