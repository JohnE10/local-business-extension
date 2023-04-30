import { useEffect, useState } from 'react';
import { isValidUrl } from '../utils/helpers';
const cheerio = require('cheerio');


const googlePageSpeedInsights = () => {

    const [url, setUrl] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const handleSubmit = () => {

        setResults(null);

        try {

            console.log('url: ', url);

            const fetchData = async () => {

                setLoading(true);

                const response = await fetch(`/api/googlePageSpeedInsightsApi?url=${url}`);
                const data = await response.json();

                if (data.error) {
                    setError(data.error);
                }
                else if (data.success) {
                    console.log(data.success.loadingExperience);
                    setResults(data.success);
                    
                }
                setLoading(false);
            }
            fetchData();

        } catch (err) {
            console.log(`Error after fetchData: ${err.message}`);
            setError(err.message);
            setLoading(false);
        }

    };

    return (
        <>
            <div className='pageTitle'><h4>Google PageSpeed Insights</h4></div>
            <div className='d-flex justify-content-center align-items-center'>
                <div><label>Enter URL:</label></div>
                <div>
                    <input
                        type='text'
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>

            {loading && <div>... Loading</div>}
            {error && <div className='text-danger'>{error}</div>}
            {results && <div>
                {/* <h5 className='mt-3'>Results for: {results.loadingExperience.initial_url}</h5> */}
                {/* <p>Performance score: {results.lighthouseResult.categories.performance.score}</p>
                <p>First contentful paint: {results.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile} ms</p>
                <p>First input delay: {results.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile} ms</p> */}
            
            </div>}

        </>


    )
}

export default googlePageSpeedInsights;