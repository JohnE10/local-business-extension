import { useEffect, useState } from 'react';
import { validateURL } from '../utils/helpers';
import useFetch from './customHooks/useFetch';

const wordPressChecker = () => {

    const [urls, setUrls] = useState([]);
    const [textArea, setTextArea] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isWordPress, setIsWordPress] = useState([]);
    const [isNotWordPress, setIsNotWordPress] = useState([]);
    const [noFetch, setNoFetch] = useState([]);
    const [noSave, setNoSave] = useState([]);
    const [inputError, setInputError] = useState(null);
    const [error, setError] = useState('');

    const isWordPressFile = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/wpCheck/isWordPress.txt';

    const isNotWordPressFile = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/wpCheck/isNotWordPress.txt';

    const basePath = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/';
    const dirToEmpty = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/wpCheck';
    const endPoint = `/api/lib/helpers/deleteDirectoryContents?path=${dirToEmpty}`;

    const { useFetchError, runFetch } = useFetch(endPoint);

    const handleClick = (e) => {
        if (textArea != '') {
            setIsLoading(true);
            setUrls(textArea.split('\n'));
            setIsWordPress('');
            setIsNotWordPress('');
            setNoSave('');
            setNoFetch('');
            runFetch();
            if (useFetchError) {
                setError(error + useFetchError);
            }
        }
    }

    try {
        const isWordPressSite = (html) => {
            if (html) {
                if (html.includes('wp-content') || html.includes('wp-json')) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };

        const noFetchPath = basePath + 'wpCheck/noFetch.txt';

        const fetchHtml = async (url) => {

            const response = await fetch(`/api/fetchUrlData?url=${url}`);
            if (!response.ok) {
                setNoFetch(previous, [...previous, url]);
            }
            const data = await response.json();

            if (data.error) {
                console.log('there\'s an error: ', data.error);
                setNoFetch(previous => [...previous, url]);
                setNoSave(createDirectoryFetch(noFetchPath, url));

            }
            else if (data.success) {
                let path = '';
                let content = '';

                if (isWordPressSite(data.success)) {
                    path = isWordPressFile;
                    setIsWordPress(prevArr => [...prevArr, url + '\n']);
                }
                else {
                    path = isNotWordPressFile;
                    setIsNotWordPress(prevArr => [...prevArr, url + '\n']);
                }

                setNoSave(createDirectoryFetch(path, url));

            }

        };

        useEffect(() => {
            if (urls.length > 0) {
                console.log('urls: ', urls);
                const runFetchHtml = async () => {
                    const promises = urls.map(async (url) => {
                        if (url && url != '') {
                            await fetchHtml(url);
                        }
                    });
                    await Promise.all(promises);
                    console.log('Process finished');
                    setIsLoading(false);
                }
                runFetchHtml();
            }
        }, [urls]);

    } catch (e) {
        console.log(e.message);
        setError(e.message);
    }

    return (
        <div className='main'>
            <div className='pageTitle'>
                <h4>Check wordpress</h4>

            </div>

            {isLoading && <div>... Loading</div>}

            <div>
                <textarea
                    value={textArea}
                    placeholder='Paste your urls here...'
                    onChange={(e) => setTextArea(e.target.value)}
                />
            </div>
            <div className='w100 m-3'>
                <button onClick={handleClick}>Submit</button>
            </div>

            {inputError && <div className='text-danger' >{inputError}</div>}

            <div>
                {error && <p className='text-danger'>Error: {error}</p>}
                {isWordPress != '' &&
                    <div className='text-center'>
                        Websites built on WordPress:<br />
                        {isWordPress.map((ele, index) => (
                            <div key={index} className='text-success'>{index + 1} - {ele}<br /></div>
                        ))}
                        <br />
                    </div>}

                {isNotWordPress != '' &&
                    <div className='text-center'>
                        Websites not built on WordPress:<br />
                        {isNotWordPress.map((ele, index) => (
                            <div key={index} className='text-success'>{index + 1} - {ele}<br /></div>
                        ))}
                        <br />
                    </div>}

                {noFetch != '' &&
                    <div className='text-center'>
                        Websites with fetch error:<br />
                        {noFetch.map((ele, index) => (
                            <div key={index} className='text-success'>{index + 1} - {ele}<br /></div>
                        ))}
                        <br />
                    </div>}

                {noSave.length > 0 &&
                    <div className='text-center'>
                        Websites that didn't save:<br />
                        {noSave.map((ele, index) => (
                            <div key={index} className='text-success'>{index + 1} - {ele}<br /></div>
                        ))}
                        <br />
                    </div>}

            </div>
        </div>
    );
};

export default wordPressChecker;

export const createDirectoryFetch = async (path, url) => {

    let createDirError = [];

    const response = await fetch(`/api/lib/helpers/createDirectoryAndSaveFile?path=${path}&content=${url}`);
    if (!response.ok) {
        return 'Error: unable to create directory'
    }
    const data = await response.json();
    if (data.success) {
        console.log(data.success);
    }
    else if (data.error) {
        console.log('createDirectoryAndSaveFile Error: ', data.error);
        createDirError.push(url);
    }

    return createDirError;

};