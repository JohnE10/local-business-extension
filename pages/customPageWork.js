
import { useEffect, useState } from 'react';
import useFetch from './customHooks/useFetch';


const createPageWork = () => {

    const [paths, setPaths] = useState('');
    const [path, setPath] = useState('');
    const [pathArr, setPathArr] = useState([]);
    const [basePath, setBasePath] = useState('');


    const cheerio = require('cheerio');

    const endPoint = `/api/customPageWorkAPI?path=${path}`;
    const { useFetchData, useFetchError, loading, runFetch } = useFetch(endPoint);

    let defaultBasePath = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/HTtrack/HTTrack_mid-city-smiles/mid-city-smiles/www.midcitysmiles.com/blog/';

    useEffect(() => {
        setBasePath(defaultBasePath);
    }, []);

    const handleSubmit = () => {
        try {

            if (path) {
                runFetch();
                console.log('runFech() ran');
                console.log('path: ', path);
                console.log('basePath: ', basePath);
            }

        } catch (error) {
            console.log('handleSubmit error: ', error.message);
        }
    }

    return (
        <>
            <div className='pageTitle'><h4>Create Page</h4></div>
            {useFetchError && <div className='text-danger'>{useFetchError}</div>}
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
                {/* <div><label>Enter URLs:</label></div>
                <div>
                    <textarea
                        type='text'
                        value={paths}
                        onChange={(e) => setPaths(e.target.value.replaceAll('\\', '/'))}
                    />
                </div>
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div> */}
                <div className='d-flex justify-content-center align-items-center'>
                    <div><label>Enter file path:</label></div>
                    <div>
                        <input
                            type='text'
                            value={path}
                            onChange={(e) => setPath(e.target.value.replaceAll('\\', '/'))}
                        />
                    </div>
                </div>

                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                {useFetchData && <div className='m-5'>{useFetchData}</div>}
            </div>

        </>

    )
}

export default createPageWork;