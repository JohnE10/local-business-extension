import { useEffect, useState } from 'react';
import { validateURL } from '../utils/helpers';

const WordPressCheckerPage = () => {

    const [url, setUrl] = useState('');
    const [textArea, setTextArea] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isWordPress, setIsWordPress] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [inputError, setInputError] = useState(null);
    const [error, setError] = useState(null);

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

    const fetchHtml = async (url) => {

        try {
            const response = await fetch(`/api/wordPressCheckAPI?url=${url}`);
            const data = await response.json();

            if (data.error) {
                console.log('there\'s an error: ', data.error);
                setError(data.error);
                setIsLoading(false);
                throw Error(data.error);
            }

            if (data.success) {
                if (isWordPressSite(data.success)) {
                    setIsWordPress(true);
                }
                else {
                    setIsWordPress(false);
                }
            }


        } catch (e) {
            console.log(e.message);
            setError(e.message);
        }
    };

    const handleInputChange = (e) => {
        setUrl(e.target.value);
        setShowResult(false);
    }

    // const handleSubmit = (e) => {

    //     setIsLoading(true);
    //     setError(null);

    //     if (!validateURL(url)) {
    //         // console.log('handleSubmit didn\'t run');
    //         setInputError('Please enter a valid URL');
    //         setShowResult(false);
    //         setIsLoading(false);
    //     }
    //     else {
    //         // console.log('handleSubmit ran');
    //         e.preventDefault();
    //         setInputError(null);
    //         setIsLoading(true);
    //         fetchHtml(url)
    //             .then(() => {
    //                 setIsLoading(false);
    //                 setShowResult(true);
    //             })
    //     }

    // };

    const handleClick = (e) => {
        if (textArea != '') {
            setIsWorking(true);
            setUrls(textArea.split('\n'));
        }
    }
    return (
        <div className='main'>
            <div className='pageTitle'>
                <h4>Check wordpress</h4>
            </div>
        
                <div>
                {/* <form onSubmit={handleSubmit}> */}
                <textarea
                    value={textArea}
                    placeholder='Paste your urls here...'
                    onChange={(e) => setTextArea(e.target.value)}
                />
                </div>
                <div className='w100 m-3'>
                    <button onClick={handleClick}>Submit</button>
                </div>
                {/* <button type="submit">Check</button><br /> */}
                {/* </form> */}



         

            {inputError && <div className='text-danger' >{inputError}</div>}


            {isLoading && (
                <div>
                    <p>Checking if {url} is built using WordPress...</p>
                </div>
            )}
            <div>
                {error && <p className='text-danger'>Error: {error}</p>}
                {!isLoading && !error && showResult && isWordPress && <p className='text-success'>The website at {url} is built using WordPress</p>}

                {!isLoading && !error && showResult && !isWordPress && <p className='text-danger'>The website at {url} is not built using WordPress</p>}
            </div>
        </div>
    );
};

export default WordPressCheckerPage;
