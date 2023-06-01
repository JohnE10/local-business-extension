import { useEffect, useState } from 'react';
import { isValidUrl } from '../utils/helpers';
import { setLazyProp } from 'next/dist/server/api-utils';
import { set } from 'mongoose';
const cheerio = require('cheerio');


const getCss = () => {

    const [url, setUrl] = useState('');
    const [basePath, setBasePath] = useState('');
    const [html, setHtml] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [nonCssHrefToString, setNonCssHrefToString] = useState(null);
    const [headCode, setHeadCode] = useState('');

    const commentRegEx = /<!--.*?-->/gs;
    let nonCssHref = [];
    let body = '';

    // let cssFileName = 'siteFiles/css/stylesheets.css';
    // let cssFileName = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/smilingfacesnola/pages/stylesheets.css';

    let cssFileName = 'siteFiles/css/stylesheets.css';


    const handleSubmit = () => {

        setHtml(null);
        setError(null);

        console.log({basePath});
        console.log({url});

        try {

            console.log('url: ', url);

            // const fetchData = async () => {
            const sendToBuildCssFile = async (path, fileName) => {

                setLoading(true);

                // const response = await fetch(`/api/fetchUrlData?url=${url}`);
                const response = await fetch(`/api/buildCssFile?cssFilePath=${path}&basePath=${basePath}&cssFileName=${fileName}`);
                const data = await response.json();

                if (data.error) {
                    setError(data.error);
                }
                else if (data.success) {
                    setHtml(data.success);
                }

            };
            sendToBuildCssFile(url, cssFileName)
                .then(() => setLoading(false));

        } catch (err) {
            console.log(`Error after fetchData: ${err.message}`);
            setError(err.message);
            setLoading(false);
        }

    };


    return (
        <>
            <div className='pageTitle'><h4>Get website CSS</h4></div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div className='d-flex justify-content-center align-items-center'>
                    <div><label>Enter base path:</label></div>
                    <div>
                        <input
                            type='text'
                            value={basePath}
                            onChange={(e) => setBasePath(e.target.value.replaceAll('\\', "/"))}
                        />
                    </div>
                </div>

                <div className='d-flex justify-content-center align-items-center'>
                    <div><label>Enter full path:</label></div>
                    <div>
                        <input
                            type='text'
                            value={url}
                            onChange={(e) => setUrl(e.target.value.replaceAll('\\', "/"))}
                        />
                    </div>
                </div>

                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>

            {loading && <div>... Loading</div>}
            {error && <div className='text-danger'>{error}</div>}
            {/* {html && <div>{JSON.stringify(html)}</div>} */}
            {/* {setNonCssHrefToString && <div>{nonCssHrefToString}</div>} */}
            {headCode && <div className='w-75'>{headCode}</div>}
            {/* {body} */}

        </>

    )
}

export default getCss;