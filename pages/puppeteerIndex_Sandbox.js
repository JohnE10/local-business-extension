import { set } from 'mongoose'
import { useEffect, useState } from 'react'
import { queryLocations } from '../utils/helpers';


const puppeteerIndex = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [queryLocation, setQueryLocation] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [searchQueryError, setSearchQueryError] = useState(null);
    const [queryLocationError, setQueryLocationError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState(null);
    const [cities, setCities] = useState(null);
    const [cityCount, setCityCount] = useState(0);
    const [runUseEffect, setRunUseEffect] = useState(false);


// try {
    

    // start the process
    const run = async (searchQuery, city, state) => {
        setLoading(true);
        setError(null);
        setResults(null);

        console.log({ searchQuery, city, state })

        const response = await fetch(`/api/puppeteerIndexApi_Sandbox?searchQuery=${searchQuery.trim()}&city=${city}&state=${state}`);

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

    useEffect(() => {
        setState(queryLocation.replace('Cities', ''));
        setCities(queryLocations[queryLocation]);
        if (queryLocation) {
            setCityCount(queryLocations[queryLocation].length);
        }
    });

    let i = 0;
    useEffect(() => {
        if (runUseEffect) {
            const fetchData = async (counter) => {
                console.log({ i });
                await run(searchQuery, cities[counter], state);
                console.log('api ran');
                i++;
                if (i < cityCount) {
                    fetchData(i)
                }
                else {
                    setRunUseEffect(false);
                    console.log('Ran all cities');
                }
            }
            fetchData(i);


        }
    }, [runUseEffect]);

    const runPuppeteerIndex = async () => {

        setRunUseEffect(true);

        // queryLocations keys array
        const queryLocationKeys = Object.keys(queryLocations);

        // check that queryLocation is on the list
        if (queryLocationKeys.includes(queryLocation)) {
            setQueryLocation(queryLocation);
        }
        else {
            setQueryLocationError('Enter a value form the dropdown list');
            return;
        }

        // check search term not empty
        if (searchQuery.trim() == '') {
            setSearchQueryError('Cannot be empty');
        }

        console.log({ searchQuery, state, cities, cityCount });

        // const run = async (searchQuery, city, state) => {
        //     setLoading(true);
        //     setError(null);
        //     setResults(null);

        //     console.log({ searchQuery, city, state })

        //     const response = await fetch(`/api/puppeteerIndexApi?searchQuery=${searchQuery.trim()}&city=${city}&state=${state}`);

        //     const data = await response.json();

        //     if (data.success) {
        //         setResults(data.success);
        //         setLoading(false);
        //         console.log('data:', data.success);
        //     }
        //     else if (data.error) {
        //         console.log('data.error: ', data.error);
        //         setError(data.error);
        //         setLoading(false);
        //     }
        // }

        // await run(searchQuery, cities, state);


    }

// } catch (error) {
//     console.log('puppeteerIndex error:', error.message);
//     setError('puppeteerIndex error: ' + error.message);
// }

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
                    {searchQueryError && <div className='text-danger' style={{ fontSize: '13px', textAlign: 'center' }}>{searchQueryError}</div>}
                </div>

                <div>
                    <label>QueryLocation:</label>
                    <input
                        className='mx-3 mt-1'
                        type='text'
                        value={queryLocation}
                        list="states"
                        onChange={(e) => setQueryLocation(e.target.value)}
                    />
                    <datalist id='states'>
                        {Object.keys(queryLocations).sort().map((city, index) => (
                            <option key={index} value={city} />
                        ))}
                    </datalist>
                    {queryLocationError && <div className='text-danger' style={{ fontSize: '13px', textAlign: 'center' }}>{queryLocationError}</div>}

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
