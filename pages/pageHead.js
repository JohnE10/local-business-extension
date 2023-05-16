import React, { useState } from 'react'

const downloadAllImages = () => {

    const [url, setUrl] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const handleSubmit = () => {
        setData(null);
        setError(null);

        try {

            console.log('url: ', url);

            const fetchData = async () => {

                setLoading(true);

                const response = await fetch(`/api/pageHeadAPI?url=${url}`);
                const responseData = await response.json();

                if (responseData.error) {
                    setError(responseData.error);
                }
                else if (responseData.success) {
                    setData(responseData.results);
                }
            }
            fetchData()
                .then(() => setLoading(false));

        } catch (err) {
            console.log(`Error after fetchData: ${err.message}`);
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <>
            <div className='pageTitle'><h4>Get Page Head</h4></div>
            {error && <div className='text-danger'>{error}</div>}
            {loading && <div>... Loading</div>}
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
            {!loading && data && <div className='text-success w-75 p-5 m-5'>{data}</div>}

        </>
    )
}

export default downloadAllImages;