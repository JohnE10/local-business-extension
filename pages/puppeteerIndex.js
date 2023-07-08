import { set } from 'mongoose'
import { useEffect, useState } from 'react'
import { queryLocations } from '../utils/helpers';


const puppeteerIndex = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [queryLocation, setQueryLocation] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [queryLocationError, setQueryLocationError] = useState(null);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     setQueryLocation(Object.keys(queryLocations).sort()[0]);
    // }, []);

    // queryLocations keys array
    const locations = Object.keys(queryLocations);

    const runPuppeteerIndex = async () => {

        // check that queryLocation is on the list
        if (locations.includes(queryLocation)) {
            setQueryLocation(queryLocation);
        }
        else {
            setQueryLocationError('Enter a value form the dropdown list');
            return;
        }

        setLoading(true);
        setError(null);
        setResults(null);

        console.log({ searchQuery, queryLocation })



        const response = await fetch(`/api/puppeteerIndexApi?searchQuery=${searchQuery.trim()}&queryLocation=${queryLocation}`)
        const data = await response.json();

        if (data.success) {
            setResults(data.success);
            setLoading(false);
            console.log('data:', data.success);
        }
        else if (data.error) {
            console.log('data.error: ', data.error);
            setError(data.error);
            setLoading(false);
        }
    }

    return (
        <div className='main'>
            <div className='pageTitle'>
                <h4>Puppeteer</h4>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-end'>
                <div>
                    <label>Search term:</label>
                    <input
                        className='m-3 mb-1'
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div>
                    <label>QueryLocation:</label>
                    <input
                        className='mx-3 mt-1'
                        type='text'
                        value={queryLocation}
                        // placeholder={Object.keys(queryLocations).sort()[0]}
                        list="states"
                        // onChange={(e) => handleQueryLocationChange(e.target.value)}
                    onChange={(e) => setQueryLocation(e.target.value)}
                    />
                    <datalist id='states'>
                        {Object.keys(queryLocations).sort().map((city, index) => (
                            <option key={index} value={city} />
                        ))}
                    </datalist>
                    {queryLocationError && <div className='text-danger' style={{fontSize: '13px', textAlign:'center'}}>{queryLocationError}</div>}

                </div>
                <div className='w-100 text-center mt-2'>
                    <button onClick={runPuppeteerIndex} >Submit</button>
                </div>
            </div>


            {loading && <div>... Loading</div>}
            {error && !loading && <div className='text-danger'>{error}</div>}
            {/* {results && !loading && <div>{results}</div>} */}

        </div>

    )
}

export default puppeteerIndex;
