import React, { useEffect, useState } from 'react'
import { fileNameFromUrl, isAbsoluteURL } from '../utils/helpers';
import useFetch from './customHooks/useFetch';
import { parse } from 'url';

const temp2 = () => {

  const [str, setStr] = useState('');
  const [temp, setTemp] = useState([]);

  // const fs = require('fs');
  // const path = require('path');


  const filePath = '/siteFiles/temp1/temp2/temp3/index.js';
  const fileContent = 'Temp text';

  const createIndexFile = async () => {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      const directoryPath = path.dirname(fullPath);

      // Create the directory path if it doesn't exist
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      // Create the index.js file and write the file content
      fs.writeFileSync(fullPath, fileContent);

      console.log('index.js file created successfully!');
    } catch (error) {
      console.error('Error creating index.js file:', error);
    }
  };

  // createIndexFile();

  const convertToRelativeURL = (urlString) => {
    const urlObj = parse(urlString, true);
    console.log({urlObj});
    const { pathname, search } = urlObj;
    const relativePath = pathname.split('/').slice(2).join('/');

    console.log(`${relativePath}${search}`);
  
    return `${relativePath}${search}`;
  }


  const handleSubmit = () => {
    console.log({str})
    convertToRelativeURL(str);
  };


  return (
    <div>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        {/* {loading && <div>... Loading</div>}
        {useFetchError && <div className='text-danger'>{useFetchError}</div>} */}
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

      {/* {temp && <div>temp: {useFetchData}</div>} */}


    </div>
  )
}

export default temp2;