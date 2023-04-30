import { set } from 'mongoose'
import { useState } from 'react'


const manualDeletePage = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const deleteBySearchQuery = async () => {
        setLoading(true);
        setError(null);
        setResults(null);

        const response = await fetch(`/api/manualDelete?searchQuery=${searchQuery}`)
        const data = await response.json();

        if (data.success) {
            setResults(data.success);
            setLoading(false);
        }
        else if (data.error) {
            console.log('data.error: ', data.error);        
            setError(data.error);
            setLoading(false);
        }
    }


    return (
        <div className='main'>
            <div className='pageTitle'>
                <h4>Manual Delete Page</h4>
            </div>
            <div>
                <label>Delete by search Query:</label>
                <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={deleteBySearchQuery} >Submit</button>
            </div>

            {loading && <div>... Loading</div>}
            {error && !loading && <div className='text-danger'>{error}</div>}
            {results && !loading && <div>{results}</div>}

        </div>

    )
}

export default manualDeletePage;
