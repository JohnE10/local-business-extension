import { useEffect, useState } from 'react';

const useFetch = (endPoint) => {

    const [useFetchData, setUseFetchData] = useState(null);
    const [useFetchError, setUseFetchError] = useState(null);
    const [loading, setLoading] = useState(false);

    const runFetch = async () => {
        try {
            setUseFetchData(null);
            console.log('useFetch ran');
            setLoading(true);
            const response = await fetch(endPoint);
            const responseData = await response.json();

            if (responseData.success) {
                setUseFetchData(responseData.success);
                setLoading(false);
            }
            else if (responseData.error) {
                setUseFetchError(responseData.error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // return { useFetchData, useFetchError, loading, runFetch };
    return { useFetchData, useFetchError, loading, runFetch };

}

export default useFetch