
import { DEV_CLIENT_PAGES_MANIFEST } from 'next/dist/shared/lib/constants';
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {

    return (
        <>
            <div className='navbar'>
                <Link href="/utilities"><h4 className='text-white'>Local Business Extension</h4></Link>
            </div>
        </>
    );
}

export default Navbar;