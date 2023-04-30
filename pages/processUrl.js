import { useEffect, useState } from 'react';
import { isValidUrl } from '../utils/helpers';
const cheerio = require('cheerio');


const processUrl = () => {

    const [url, setUrl] = useState('');
    const [html, setHtml] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const handleSubmit = () => {

        setHtml(null);

        try {

            console.log('url: ', url);

            const fetchData = async () => {

                setLoading(true);

                const response = await fetch(`/api/processUrlApi?url=${url}`);
                const data = await response.json();

                if (data.error) {
                    setError(data.error);
                }
                else if (data.success) {
                    // setHtml(JSON.stringify(data.success));
                    setHtml(data.success);
                }
            }
            fetchData();

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

                const parsedUrl = new URL(url);

                const $ = cheerio.load(JSON.stringify(html));
                const links = [];

                $('a').each(function (i, element) {
                    const href = $(this).attr('href');
                    if (href) {
                        console.log(href);
                        if (isValidUrl(href)) {
                            console.log(href + ' is a valid href');
                            let parsedHref = new URL(href);
                            if (parsedHref.host == parsedUrl.host) {
                                if (!links.includes(parsedHref)) {
                                    console.log('parsedHref: ', parsedHref);
                                    links.push(parsedHref);
                                }
                            }
                        }
                    }

                });

                setLoading(false);
                console.log('links: ', links);


            } catch (err) {
                console.log(`Error inside useEffect: ${err.message}`);
                // setError(err.message);
                setLoading(false);
            }
        }

    }, [html]);

    return (
        <>
            <div className='pageTitle'><h4>Process URL</h4></div>
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

        </>


    )
}

export default processUrl;