
import { useEffect, useState } from 'react';


const createPage = () => {

    const [urls, setUrls] = useState('');
    const [urlArr, setUrlArr] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const replaceStr = 'blog/';

    const sendToCreatePageApi = async (siteUrl) => {

        const response = await fetch(`/api/createPageApi?url=${siteUrl}&replaceStr=${replaceStr}`);
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
    }

    useEffect(() => {
        setUrlArr(urls.split('\n'));
    }, [urls]);

    const handleSubmit = () => {

        setLoading(true);


        console.log('urlArr: ', urlArr);

        try {

            urlArr.forEach((url, index) => {
                // const sendToCreatePageApi = async (siteUrl) => {

                //     const response = await fetch(`/api/createPageApi?url=${siteUrl}&replaceStr=${replaceStr}`);
                //     const data = await response.json();

                //     if (data.success) {
                //         setLoading(false);
                //         console.log(data.success);

                //     }
                //     else if (data.error) {
                //         console.log(data.error);
                //         setLoading(false);
                //         setError(data.error);
                //     }
                // }
                sendToCreatePageApi(url);
            })



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
            </div>

        </>

    )
}

export default createPage;