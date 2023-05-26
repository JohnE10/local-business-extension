import React, { useState } from 'react'

const downloadAllImages = () => {

    const [url, setUrl] = useState('');
    const [basePath, setBasePath] = useState('');
    const [data, setData] = useState([]);
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
    console.log({ data });

    return (
        <>
            <div className='pageTitle'><h4>Get Page Head</h4></div>
            {error && <div className='text-danger'>{error}</div>}
            {loading && <div>... Loading</div>}
            <div className='d-flex flex-column justify-content-center align-items-center'>

                <div className='d-flex justify-content-center align-items-center'>
                    <div><label>Enter BasePath:</label></div>
                    <div>
                        <input
                            type='text'
                            value={basePath}
                            onChange={(e) => setBasePath(e.target.value.replaceAll('\\', '/'))}
                        />
                    </div>
                </div>

                <div className='d-flex justify-content-center align-items-center'>
                    <div><label>Enter Full URL:</label></div>
                    <div>
                        <input
                            type='text'
                            value={url}
                            onChange={(e) => setUrl(e.target.value.replaceAll('\\', '/'))}
                        />
                    </div>
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