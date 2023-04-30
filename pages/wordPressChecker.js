import { useEffect, useState } from 'react';
import { validateURL } from '../utils/helpers';

const wordPressChecker = () => {

    const [urls, setUrls] = useState([]);
    const [jsxString, setJsxString] = useState('');
    const [results, setResults] = useState('');
    const [textArea, setTextArea] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isWordPress, setIsWordPress] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [inputError, setInputError] = useState(null);
    const [error, setError] = useState(null);
    const [finalResults, setFinalResults] = useState('');

    const isWordPressSite = (html) => {
        // Check for WordPress-specific code or patterns in the HTML
        if (html) {
            if (html.includes('wp-content') || html.includes('wp-json')) {
                return true;
            }
            else {
                return false;
            }
        }
    };

    let tempResults = [];

    const fetchHtml = async (url) => {



        try {

            const parsedUrl = new URL(url);

            // url = parsedUrl.host + parsedUrl.host

            const response = await fetch(`/api/fetchUrlData?url=${url}`);
            const data = await response.json();

            if (data.error) {
                console.log('there\'s an error: ', data.error);
                setError(data.error);
                setIsLoading(false);
                // throw Error(data.error);

            }

            if (data.success) {
                // console.log('data.success: ', data.success);
                if (isWordPressSite(data.success)) {
                    // setIsWordPress(true);
                    // setResults({ ...results, url: url, isWP: true});
                    // tempResults.push({ url, isWP: true });
                    tempResults.push(JSON.stringify({ url, isWP: true }));
                    setResults(tempResults.join('\r\n'));

                }
                else {
                    // setIsWordPress(false);
                    // setResults({ ...results, url: url, isWP: false});
                    // tempResults.push({ url, isWP: false });
                    tempResults.push(JSON.stringify({ url, isWP: false }));
                    setResults(tempResults.join('\r\n'));

                }
            }


        } catch (e) {
            console.log(e.message);
            setError(e.message);
        }
    };

    const handleClick = (e) => {
        if (textArea != '') {
            setJsxString('');
            setIsLoading(true);
            setUrls(textArea.split('\n'));
        }

    }

    useEffect(() => {
        if (urls.length > 0) {
            console.log('urls.length: ', urls.length);
            console.log('urls: ', urls);
            urls.forEach((url) => {
                fetchHtml(url);
            })
        }
    }, [urls]);

    console.log('results: ', results);
    console.log('urls.length: ', urls.length);
    console.log('results.length: ', results.length);


    return (
        <div className='main'>
            <div className='pageTitle'>
                <h4>Check wordpress</h4>
            </div>

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


            {results}

            {/* {isLoading && (
                <div>
                    <p>Checking if {url} is built using WordPress...</p>
                </div>
            )}
            <div>
                {error && <p className='text-danger'>Error: {error}</p>}
                {!isLoading && !error && showResult && isWordPress && <p className='text-success'>The website at {url} is built using WordPress</p>}

                {!isLoading && !error && showResult && !isWordPress && <p className='text-danger'>The website at {url} is not built using WordPress</p>}
            </div> */}
        </div>
    );
};

export default wordPressChecker;
