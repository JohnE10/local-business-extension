
import { useEffect, useState } from 'react';


const createPage = () => {

    const [paths, setPaths] = useState('');
    const [pathArr, setPathArr] = useState([]);
    const [text, setText] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const basePath = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/HTTrack_mid-city-smiles/mid-city-smiles/www.midcitysmiles.com/blog/';

    const replaceStr = 'blog/';

    const isFile = async (dirPath) => {
        const response = await fetch(`/api/fileOrDirectoryApi?path=${dirPath}`);
        const data = await response.json();

        console.log({data: data.success});
        return data.success;
    }

    const sendToCreatePageApi = async (path, base, str) => {

        setTimeout(async () => {
            console.log('sendToCreatePageApi ran');
            const response = await fetch(`/api/createPageApi?pagePath=${path}&basePath=${base}&replaceStr=${str}`);
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
        setPathArr(paths.split('\n'));
    }, [paths]);

    const handleSubmit = () => {

        setLoading(true);

        console.log('pathArr: ', pathArr);

        console.log({pathArr});

        try {
            let i = 0;
            const runControl = () => {
                sendToCreatePageApi(pathArr[i], basePath, replaceStr);
                console.log('i: ', i);
                i++;
                if (i < pathArr.length) {
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
                        value={paths}
                        onChange={(e) => setPaths(e.target.value)}
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