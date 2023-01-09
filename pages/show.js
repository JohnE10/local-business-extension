import { useEffect, useState } from "react";
import ListingsTable from '../components/ListingsTable';

export default function Show() {

    // declare variables
    const [listings, setListings] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        // retrieve listings, to be passed to ListingsTable below, from local storage
        try {
            console.log('listings is: ', JSON.parse(localStorage.getItem('listings')));
            // 
            setListings(JSON.parse(localStorage.getItem('listings')));
        } catch (err) {
            setError(err.message);
        }

    }, []);

    return (
        <div>
            <h2 className='text-center my-4'>Business Listings</h2>
            <div className="container w-75">
                {error && <h3 className='text-danger text-center'>Error: {error}</h3>}
                {listings && !error && <ListingsTable listings={listings} />}
            </div>

        </div>
    );
}