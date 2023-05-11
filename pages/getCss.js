import { useEffect, useState } from 'react';
import { isValidUrl } from '../utils/helpers';
import { setLazyProp } from 'next/dist/server/api-utils';
import { set } from 'mongoose';
const cheerio = require('cheerio');


const getCss = () => {

    const [url, setUrl] = useState('');
    const [html, setHtml] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [nonCssHrefToString, setNonCssHrefToString] = useState(null);
    const [headCode, setHeadCode] = useState('');

    const commentRegEx = /<!--.*?-->/gs;
    let nonCssHref = [];
    let body = '';

    let cssFileName = 'temp.css';

    const sendToBuildCssFile = async (url, fileName) => {
        const response = await fetch(`/api/buildCssFile?url=${url}&cssfileName=${fileName}`);
        const getCssData = await response.json();

        if (getCssData.success) {
            console.log('getCssData received')
        }
        else if (getCssData.error) {
            setError(getCssData.err);
            console.log(getCssData.error);
        }
    }

    const handleSubmit = () => {

        setHtml(null);
        setError(null);

        try {

            console.log('url: ', url);

            const fetchData = async () => {

                setLoading(true);

                const response = await fetch(`/api/fetchUrlData?url=${url}`);
                const data = await response.json();

                if (data.error) {
                    setError(data.error);
                }
                else if (data.success) {
                    setHtml(data.success);
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

    useEffect(() => {

        if (html) {

            console.log('useEffect ran');

            try {

                const $ = cheerio.load(html);

                $('link').map((i, ele) => {
                    if ($(ele).attr('rel')) {
                        if ($(ele).attr('rel') == 'stylesheet') {
                            if ($(ele).attr('href').includes('.css')) {
                                // console.log($(ele).attr('href'));
                                sendToBuildCssFile(($(ele).attr('href')), cssFileName);
                            }
                            else {
                                nonCssHref.push($(ele).attr('href'))
                            }
                        }
                    }
                });

                body = $('body').html();
                // body = '<div><!-- This is a comment -->Hello world!</div>';
                body = body.replaceAll(commentRegEx, '');

                const options = {
                    method: 'POST',
                    body: JSON.stringify(body)
                }

                const postRequest = async () => {
                    const response = await fetch('/api/buildPageBody', options);
                    const data = await response.json();
                }
                if(body) {
                    postRequest();
                    console.log('postRequest ran');
                }

                // $('meta').remove();
                // // console.log($.html());
                // console.log($('head').toString());

                // setLoading(false);

                setNonCssHrefToString(nonCssHref.toString());

            } catch (err) {
                console.log(`Error inside useEffect: ${err.message}`);
                setError(err.message);
                setLoading(false);
            }
        }

    }, [html]);

    return (
        <>
            <div className='pageTitle'><h4>Get website CSS</h4></div>
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
            {/* {html && <div>{JSON.stringify(html)}</div>} */}
            {setNonCssHrefToString && <div>{nonCssHrefToString}</div>}
            {headCode && <div className='w-75'>{headCode}</div>}
            {/* {body} */}

        </>

    )
}

export default getCss;