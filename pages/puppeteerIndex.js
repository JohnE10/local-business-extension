import { set } from 'mongoose'
import { useState } from 'react'


const puppeteerIndex = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const runPuppeteerIndex = async () => {
        setLoading(true);
        setError(null);
        setResults(null);

        const response = await fetch(`/api/puppeteerIndexApi?searchQuery=${searchQuery.trim()}`)
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
            <div>
                <label>Search term:</label>
                <input
                className='m-3'
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={runPuppeteerIndex} >Submit</button>
            </div>

            {loading && <div>... Loading</div>}
            {error && !loading && <div className='text-danger'>{error}</div>}
            {/* {results && !loading && <div>{results}</div>} */}

        </div>

    )
}

export default puppeteerIndex;
