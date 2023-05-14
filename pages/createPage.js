
import { useEffect, useState } from 'react';


const createPage = () => {

    const [urls, setUrls] = useState('');
    const [urlArr, setUrlArr] = useState([]);
    const [text, setText] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const replaceStr = 'blog/';

    const sendToCreatePageApi = async (siteUrl, str) => {

        setTimeout(async () => {
            console.log('sendToCreatePageApi ran');
            const response = await fetch(`/api/createPageApi?url=${siteUrl}&replaceStr=${str}`);
            const data = await response.json();

            if (data.success) {
                setLoading(false);
                console.log(data.success);

            }
            else if (data.error) {
                console.log(data.error);
                setLoading(false);
                setError(data.error);
            }
        }, 1000)

    }

    useEffect(() => {
        setUrlArr(urls.split('\n'));
    }, [urls]);

    const handleSubmit = () => {

        setLoading(true);

        console.log('urlArr: ', urlArr);

        try {
            let i = 0;
            const runControl = () => {
                sendToCreatePageApi(urlArr[i], replaceStr);
                console.log('i: ', i);
                i++;
                if (i < urlArr.length) {
                    runControl();
                }
                else {
                    setLoading(false);
                    setText('Done!')
                }
            }
            runControl();

        } catch (err) {
            setError(err.message);
            console.log(err.message);
        }

    }

    return (
        <>
            <div className='pageTitle'><h4>Create Page</h4></div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <div><label>Enter URLs:</label></div>
                <div>
                    <textarea
                        type='text'
                        value={urls}
                        onChange={(e) => setUrls(e.target.value)}
                    />
                </div>
                <div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                {text && <div className='mt-5'>Done.</div>}
            </div>

        </>

    )
}

export default createPage;