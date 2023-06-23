// in show2.js, I added more fields to be extracted

import { useEffect, useState } from "react";
import ListingsTable from '../components/ListingsTable';
import BootstrapModal from '../components/BootstrapModal';
import Button from 'react-bootstrap/Button';
import styles from '../styles/Show.module.css';

export default function Show() {

    // handle checkbox
    const handleCheckbox = (e) => {

        if (e.target.checked) {
            console.log('checked');
            setHide(true);
        } else {
            console.log('not checked');
            setHide(false);
        }

    };

    // declare variables
    const [listings, setListings] = useState(null);
    const [hide, setHide] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    // let tempData = [];
    let response;
    let tempData;

    useEffect(() => {
        // retrieve listings, to be passed to ListingsTable below, from local storage
        setListings(JSON.parse(localStorage.getItem('listings')));
    }, []);


    useEffect(() => {
        try {

            console.log('listings is: ', listings);

            const fetchUrl = `http://localhost:3000/api/storeData`;
            const fetchData = async () => {
                response = await fetch(fetchUrl, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(listings)
                });

                // tempData = await response.json();
                setData(await response.json());
                console.log('response is: ', response);
            }

            if (listings) {
                fetchData();
                console.log('data fetched');
            }

        } catch (err) {
            setError(err.message);
        }
    }, [listings]);

    console.log('data is: ', data);

    // handle list of urls popup
    const handlePopup = () => {
        setIsOpen(true);
    }

    return (
        <div className='w-100'>
            <h2 className='text-center m-4'>Business Listings</h2>
            {hide && !data && !error && <div className='text-center my-3'>...Loading - This may take a moment</div>}

            <div className='d-flex justify-content-center align-items-center m-3'>
                <div><label className='text-end'>Hide Previously Seen</label></div>
                <div><input type="checkbox" name="checkbox" className={styles.input} onChange={handleCheckbox} /></div>
            </div>

            <div className="container w-75">
                {error && <h3 className='text-danger text-center'>Error: {error}</h3>}

                {!hide && listings && !error &&
                    <div className='text-center m-3'>
                        <BootstrapModal allData={listings} />
                    </div>
                }

                {!hide && listings && !error && <ListingsTable listings={listings} />}
                {hide && data && !error &&
                    <div className='text-center m-3'>
                        <BootstrapModal nonExisting={data} />
                    </div>
                }

                {hide && data && !error && <ListingsTable nonExisting={data} />}
                
            </div>

        </div>
    );
}