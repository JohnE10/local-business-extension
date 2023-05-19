import React, { useState } from 'react'

const getFilesDirectoriesInUrl = () => {

    const [url, setUrl] = useState('');
    const [html, setHtml] = useState(null);
    const [error, setError] = useState(null);
    const [files, setFiles] = useState(null);
    const [directories, setDirectories ] = useState(null);
    const [loading, setLoading] = useState(null);

    const handleSubmit = () => {

        setLoading(true);
        setHtml(null);
        setError(null);

        try {

            console.log('url: ', url);

            const fetchData = async () => {

                setLoading(true);

                const response = await fetch(`/api/getFilesDirectoriesInUrlAPI?url=${url}`);
                const data = await response.json();

                if (data.error) {
                    setError(data.error);
                }
                else if (data.success) {
                    setHtml(data.success);
                    setFiles(data.success[0]);
                    setDirectories(data.success[1]);
                    setLoading(false);
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
            <div className='pageTitle'><h4>Get Files and Directories form URL</h4></div>
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
            {files || directories && <div className='text-success'>Success: data extracted.</div>}
        </>
    )
}

export default getFilesDirectoriesInUrl