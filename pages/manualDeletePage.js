import { set } from 'mongoose';
import { useState } from 'react';
import styles from '../styles/SeachDatabase.module.css';


const manualDeletePage = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [queryValue, setQueryValue] = useState('');
    const [url, setUrl] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [showName, setShowName] = useState('');
    const [fieldValue, setFieldValue] = useState('');


    const deleteBySearchQuery = async () => {
        setLoading(true);
        setError(null);
        setResults(null);

        const response = await fetch(`/api/manualDelete?searchQuery=${searchQuery.trim()}`)
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
    };

    const deleteByUrl = async () => {
        setLoading(true);
        setError(null);
        setResults(null);

        const response = await fetch(`/api/manualDelete?searchQuery=${searchQuery.trim()}`)
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
    };

    const handleQueryChange = (e) => {

        setActive(true);
        setQueryValue(e.target.value);

        Object.entries(queries).map(([key, value]) => {
            if (key == e.target.id.replace('Input', '')) {
                setQueries({ ...queries, [key]: e.target.value });
            }
        })

    }

    const handleDelete = async (e) => {

        const queryName = e.target.id.replace('Button', '');
        setShowName(queryName);

        Object.entries(queries).map(([key, value]) => {
            if (key == e.target.id.replace('Input', '')) {
                setQueries({ ...queries, [key]: '' });
            }
        })

        console.log({queryName, queryValue});

        setLoading(true);
        setError(null);
        setResults(null);

        const response = await fetch(`/api/manualDelete?queryValue=${queryValue}&queryName=${queryName}`);

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

    const handleFieldEmptying = async (e) => {

        const queryName = e.target.id.replace('Button', '');
        setShowName(queryName);

    }
 
    const [queries, setQueries] = useState({ search: '', url: '', email: '' });

    const queryJsx = Object.entries(queries).map(([key, value]) => (
        <div key={key} className={styles.search}>
            <div><label>Delete by {key}:</label></div>
            <div className='px-3'>
                <input
                    id={`${key}Input`}
                    type='text'
                    value={value}
                    onChange={handleQueryChange}
                />
            </div>
            <div>

                <button id={`${key}Button`} onClick={handleDelete} disabled={!active}>Submit</button>
                {/* <button id={`${key}Button`} onClick={handleSearch} disabled={!active}>Submit</button> */}

            </div>
        </div>
    ));

    // const [fieldsToEmpty, setFieldsToEmpty] = useState({email: '' });


    // const fieldsToEmptyJsx = Object.entries(fieldsToEmpty).map(([key, value]) => (
    //     <div key={key} className={styles.search}>
    //         <div className='px-3'><label>Remove data from all {key} fields:</label></div>
    //         {/*<div className='px-3'>
    //              <input
    //                 id={`${key}Input`}
    //                 type='text'
    //                 value={value}
    //                 onChange={handleFieldEmptyingChange}
    //             /> 
    //         </div>*/}
    //         <div>

    //             <button id={`${key}Button`} onClick={handleFieldEmptying} disabled={!active}>Submit</button>
    //             {/* <button id={`${key}Button`} onClick={handleSearch} disabled={!active}>Submit</button> */}

    //         </div>
    //     </div>
    // ));




    return (
        <div className='main'>
            <div className='pageTitle'>
                <h4>Manual Delete Page</h4>
            </div>

            <div className={styles.searschBlock}>
                {queryJsx}
            </div>
{/* 
            <div className='p-5'>--------------------------------------------------------------</div>

            <div className='pageTitle'>
                <h4>Empty all field values</h4>
            </div>

            <div className={styles.searschBlock}>
                {fieldsToEmptyJsx}
            </div> */}


            {loading && <div>... Loading</div>}
            {error && !loading && <div className='text-danger'>{error}</div>}
            {results && !loading && <div>{results}</div>}

        </div>

    )
}

export default manualDeletePage;
