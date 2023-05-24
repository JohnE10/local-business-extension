import { useEffect, useRef, useState } from 'react';
import { isValidUrl } from '../utils/helpers';
import { setLazyProp } from 'next/dist/server/api-utils';
import FileUploader from '../components/FileUploader';
const cheerio = require('cheerio');


const getMainDir = () => {


    const [directoryPath, setDirectoryPath] = useState('');
    const [directories, setDirectories] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // const pathDirectory = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/http___www.midcitysmiles.com_blog/www.midcitysmiles.com/blog/';

    const handleSubmit = () => {

        console.log('directoryPath: ', directoryPath);

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

    // useEffect(() => {

    //     if (directories) {

    //         console.log('useEffect ran');

    //         try {

    //             // const parsedUrl = new URL(directoryPath);


    //             const $ = cheerio.load(directories);

    //             let navLinks = [];
    //             let cssLinks = [];
    //             let styleTags = [];

    //             // $('nav > ul > li > a').map((i, ele) => {
    //             $('nav').find('li').find('a').map((i, ele) => {
    //                 if ($(ele).attr('href')) {
    //                     const href = $(ele).attr('href');
    //                     if (!navLinks.includes(href.trim())) {
    //                         navLinks.push(href.trim());
    //                         setNavLinksState(previous => [...previous, href.trim()]);
    //                         // if (isValidUrl(href)) {
    //                         //     console.log(href, ' is a valid directoryPath');
    //                         // }
    //                         // else {
    //                         //     console.log(href, ' is a not valid');
    //                         // }
    //                     }
    //                 }
    //                 else {
    //                     console.log('No a tag href attribute')
    //                 }


    //             });

    //             if ($('link[rel="stylesheet"]')) {
    //                 $('link[rel="stylesheet"]').map((i, link) => {
    //                     cssLinks.push(($(link).attr('href')));
    //                     console.log(($(link).attr('href')));

    //                 })
    //             }
    //             else {
    //                 console.log('No link[rel]');
    //             }

    //             if ($('style')) {
    //                 cssLinks.push($('style').text());
    //             }
    //             else {
    //                 consol.log('No style tags')
    //             }

    //             setLoading(false);
    //             console.log('navLinks: ', navLinks);
    //             console.log('cssLinks: ', cssLinks);
    //             console.log('styleTags count: ', styleTags.length);

    //         } catch (err) {
    //             console.log(`Error inside useEffect: ${err.message}`);
    //             setError(err.message);
    //             setLoading(false);
    //         }
    //     }

    // }, [directories]);

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
                        onChange={(e) => setDirectoryPath(e.target.value)}
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

export default getMainDir;