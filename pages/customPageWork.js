
import { useEffect, useState } from 'react';
import useFetch from './customHooks/useFetch';
import { isAbsoluteURL } from '../utils/helpers';


const createPageWork = () => {

    const [paths, setPaths] = useState('');
    const [path, setPath] = useState('');
    const [html, setHtml] = useState('');
    const [pathArr, setPathArr] = useState([]);
    const [basePath, setBasePath] = useState('');
    const [text, setText] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [runGeturls, setRunGetUrls] = useState(false);

    const cheerio = require('cheerio');

    const endPoint = `/api/lib/helpers/getFileContent?path=${path}`;
    const { useFetchData, useFetchError, runFetch } = useFetch(endPoint);

    let defaultBasePath = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/HTtrack/HTTrack_mid-city-smiles/mid-city-smiles/www.midcitysmiles.com/blog/';

    if (defaultBasePath[defaultBasePath.length - 1] != '/') {
        defaultBasePath = defaultBasePath + '/';
    }

    useEffect(() => {
        setBasePath(defaultBasePath);
    }, [defaultBasePath]);

    useEffect(() => {
        if (useFetchData && useFetchData != '') {
            setHtml(useFetchData);
            console.log('setHtml(useFetchData) ran');
        }
    }, [useFetchData]);

    useEffect(() => {
        if (html && html != '') {
            getUrls(html);
            console.log('getUrls ran');
        }
    }, [html]);

    const getUrls = (fileHtml) => {

        try {
            if (fileHtml) {
                let $ = cheerio.load(fileHtml);

                let aTags = $('body').find('a');

                // get pages to create
                let tempArr = [];
                aTags.each((i, el) => {
                    if ($(el).attr('href')) {
                        let temp = $(el).attr('href').trim();
                        temp = temp.replaceAll('../../', '').replaceAll('../', '').replaceAll('./','');
                        console.log({temp});
                        if (!isAbsoluteURL(temp) && !temp.includes('tel:') && !temp.includes('mailto:') && !temp.includes('#content')) {
                            if (!tempArr.includes(temp)) {
                                tempArr.push(temp);
                                console.log({ temp });
                                sendToCreatePageApi(temp, basePath);
                            }
                        }
                    }
                });
            }
            

        } catch (error) {
            console.log('getUrls Error: ', error.message);
            setError('getUrls Error: ' + error.message);
        }
    };

    const sendToCreatePageApi = async (pagePath, base) => {

        setTimeout(async () => {
            console.log('sendToCreatePageApi ran');
            const response = await fetch(`/api/createPageApi?pagePath=${pagePath}&basePath=${base}`);
            const data = await response.json();

            if (data.success) {
                setLoading(false);
                console.log(data.success);

            }
            else if (data.error) {
                console.log(data.error);
                setLoading(false);
                setError(error + data.error + '\n');
            }
        }, 1000)

    }


    const handleSubmit = () => {

        setLoading(true);
        setError('');
        setHtml('');
        // setRunGetUrls(true);

        if (path) {
            runFetch();
            console.log('runFech() ran');
            console.log('path: ', path);
            console.log('basePath: ', basePath);
        }
  }

    return (
        <>
            <div className='pageTitle'><h4>Create Page</h4></div>
            {error && <div className='text-danger'>{error}</div>}
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
                {text && <div className='mt-5'>Done.</div>}
            </div>

        </>

    )
}

export default createPageWork;