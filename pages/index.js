import { useEffect, useState } from "react";
import ListingsTable from '../components/ListingsTable';

export default function Home() {

  const [listings, setListings] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {

        let temp = localStorage.getItem('listings');
        temp = JSON.parse(temp);
        console.log('get item is: ', temp);
        setListings(temp);
      }
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