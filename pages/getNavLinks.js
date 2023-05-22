import { useEffect, useState } from 'react';
import { isValidUrl } from '../utils/helpers';
import { setLazyProp } from 'next/dist/server/api-utils';
const cheerio = require('cheerio');


const getNavLinks = () => {

    const [url, setUrl] = useState('');
    const [html, setHtml] = useState(null);
    const [navLinksState, setNavLinksState] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const handleSubmit = () => {

        setHtml(null);
        setError(null);
        setNavLinksState([]);

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

                // const parsedUrl = new URL(url);


                const $ = cheerio.load(html);

                let navLinks = [];
                let cssLinks = [];
                let styleTags = [];

                // $('nav > ul > li > a').map((i, ele) => {
                    $('nav').find('li').find('a').map((i, ele) => {
                    if ($(ele).attr('href')) {
                        const href = $(ele).attr('href');
                        if (!navLinks.includes(href.trim())) {
                            navLinks.push(href.trim());
                            setNavLinksState(previous => [...previous, href.trim()]);
                            // if (isValidUrl(href)) {
                            //     console.log(href, ' is a valid url');
                            // }
                            // else {
                            //     console.log(href, ' is a not valid');
                            // }
                        }
                    }
                    else {
                        console.log('No a tag href attribute')
                    }


                });

                if ($('link[rel="stylesheet"]')) {
                    $('link[rel="stylesheet"]').map((i, link) => {
                        cssLinks.push(($(link).attr('href')));
                        console.log(($(link).attr('href')));
                        // cssLinks.push(($(link).attr('href')).get());
                        // console.log(($(link).attr('href')).get());
                    })
                }
                else {
                    console.log('No link[rel]');
                }

                if ($('style')) {
                    cssLinks.push($('style').text());
                }
                else {
                    consol.log('No style tags')
                }

                setLoading(false);
                console.log('navLinks: ', navLinks);
                console.log('cssLinks: ', cssLinks);
                console.log('styleTags count: ', styleTags.length);

            } catch (err) {
                console.log(`Error inside useEffect: ${err.message}`);
                setError(err.message);
                setLoading(false);
            }
        }

    }, [html]);

    return (
        <>
            <div className='pageTitle'><h4>Get navigation menu links</h4></div>
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
            {navLinksState &&

                navLinksState.map((ele, i) => (
                    <div key={i}>{ele}</div>
                ))
            }

        </>

    )
}

export default getNavLinks;