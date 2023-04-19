import { useEffect, useState } from "react";
import styles from '../styles/listAllSearches.module.css'


const listAllSearches = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        setLoading(true);
        setData(null);

        try {

            console.log('searchQuery: ', searchQuery);

            const response = await fetch(`/api/listAllSearches?searchQuery=${searchQuery}`);

            if (!response.ok) {
                throw Error('Unable to fetch data for that resource.')
            }

            setData(await response.json());

        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }

    }

    useEffect(() => {
        if (data || error) {
            setLoading(false);
            console.log('data: ', data);
        }
    }, [data, error]);



    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageTitle}>
                <h3>Search Database</h3>
            </div>
            <div>
                <p>Search by:</p>
                <label>Search query:</label>
                <input
                    className={styles.searchInput}
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>

            {loading && !data && !error && <div>... loading</div>}

        </div>

    )
}

export default listAllSearches;