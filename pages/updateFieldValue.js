import styles from '../styles/SeachDatabase.module.css';
import { useEffect, useState } from 'react'
import { capFirst } from '../utils/helpers';



const searchDataBase = () => {

    // const [queryName, setQueryName] = useState('');
    const [queryValue, setQueryValue] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showName, setShowName] = useState('');
    const [active, setActive] = useState(false);

    const [queries, setQueries] = useState({ search: '', name: '', url: '', advertising: '' });

    const handleQueryChange = (e) => {

        setActive(true);
        setQueryValue(e.target.value);

        Object.entries(queries).map(([key, value]) => {
            if (key == e.target.id.replace('Input', '')) {
                setQueries({ ...queries, [key]: e.target.value });
            }
        })

    }

    const handleSearch = async (e) => {

        const queryName = e.target.id.replace('Button', '');
        setShowName(queryName);

        Object.entries(queries).map(([key, value]) => {
            if (key == e.target.id.replace('Input', '')) {
                setQueries({ ...queries, [key]: '' });
            }
        })

        setLoading(true);
        setError(null);
        setResults(null);

        const response = await fetch(`/api/updateFieldValueApi?queryValue=${queryValue}&queryName=${queryName}`);
        const data = await response.json();

        if (data.success) {
            setResults(data.success);
            setLoading(false);
        }
        else if (data.error) {
            console.log('data.error: ', data.error);
            setError(data.error);
            setLoading(false);
        } 
    }

    const queryJsx = Object.entries(queries).map(([key, value]) => (
        <div key={key} className={styles.search}>
            <div><label>Update {key} field if empty:</label></div>
            <div className='px-3'>
                <input
                    id={`${key}Input`}
                    type='text'
                    value={value}
                    onChange={handleQueryChange}
                />
            </div>
            <div>

                <button id={`${key}Button`} onClick={handleSearch} disabled={!active}>Submit</button>

            </div>
        </div>
    ));

    if (results) {
        if (results.length > 0) {
            console.log('results: ', results);
        }
    }



    return (
        <div className='main'>
            <div className='pageTitle'>
                <h4>Update Fields in Database</h4>
            </div>
            <div className={styles.searschBlock}>
                {queryJsx}
            </div>

            {loading && <div>... Loading</div>}
            {results && !loading && <div className='mb-4'>Query Name: {showName} - Query Term: {queryValue}</div>}
            {error && !loading && <div className='text-danger'>{error}</div>}
            {results && <div>Count: {results.length}</div>}

            {results && !loading &&
                results.map((ele, i) => (
                    <div key={i} className='d-flex flex-column justify-content-start align-items-start m-3 '>
                        {Object.keys(ele).map((key, index) => (
                            <div style={{ width: '700px' }}>{capFirst(key)}: {ele[key]}</div>
                        ))}
                    </div>
                ))
            }

        </div>

    )
}

export default searchDataBase;
