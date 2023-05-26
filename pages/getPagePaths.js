import { useEffect, useRef, useState } from 'react';
import { isValidUrl } from '../utils/helpers';
import { setLazyProp } from 'next/dist/server/api-utils';
import FileUploader from '../components/FileUploader';
const cheerio = require('cheerio');


const getPagePaths = () => {


    const [directoryPath, setDirectoryPath] = useState('');
    const [directories, setDirectories] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const handleSubmit = () => {

        setLoading(true);
        setDirectories(null);
        setError(null);

        try {

            console.log('directoryPath: ', directoryPath);

            const fetchData = async () => {

                const response = await fetch(`/api/listFilesInDirectoryApi?directoryPath=${directoryPath}`);
                const data = await response.json();

                if (data.error) {
                    setError(data.error);
                }
                else if (data.success) {
                    setDirectories(data.success);
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
            <div className='pageTitle'><h4>Get Main Directory</h4></div>
            {loading && <div>... Loading</div>}
            {error && <div className='text-danger'>{error}</div>}
            <div className='d-flex justify-content-center align-items-center'>
                <div><label>Enter URL:</label></div>
                <div>
                    <input
                        type='text'
                        value={directoryPath}
                        onChange={(e) => setDirectoryPath(e.target.value.replaceAll('\\', '/'))}
                    />
                </div>
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>

            {directories &&

                directories.map((ele, i) => (
                    <div key={i}>{directoryPath + ele}</div>
                ))
            }




        </>

    )
}

export default getPagePaths;