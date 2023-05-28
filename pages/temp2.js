import React, { useEffect, useState } from 'react'
import { fileNameFromUrl, isAbsoluteURL } from '../utils/helpers';
import useFetch from './customHooks/useFetch';

const temp2 = () => {

  const [str, setStr] = useState('');
  const [temp, setTemp] = useState([]);

  // const url = 'https://jsonplaceholder.typicode.com/users';
  // const endPoint = `/api/lib/helpers/fetchUrlData?url=${url}`

  const dirToEmpty = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/wpCheck';
  const endPoint = `/api/lib/helpers/deleteDirectoryContents?path=${dirToEmpty}`;

  const { useFetchData, useFetchError, loading, runFetch } = useFetch(endPoint);
  const handleSubmit = () => {
    runFetch()
  }

  return (
    <div>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        {loading && <div>... Loading</div>}
        {useFetchError && <div className='text-danger'>{useFetchError}</div>}
        <div className='d-flex justify-content-center align-items-center '>
        <div><label>Enter BasePath:</label></div>
        <div>
          <input
            type='text'
            value={str}
            onChange={(e) => setStr(e.target.value.replaceAll('\\', '/'))}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        </div>

      </div>

      {temp && <div>temp: {useFetchData}</div>}


    </div>
  )
}

export default temp2;