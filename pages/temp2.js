import React, { useEffect, useState } from 'react'
import { fileNameFromUrl, isAbsoluteURL } from '../utils/helpers';

const temp2 = () => {

  const [temp, setTemp] = useState('');

const dirPath = 'siteFiles/pages/';

const fetchFunc = async (path) => {
  const response = await fetch(`/api/lib/helpers/deleteDirectoryContents?path=${path}`);
  const data = await response.json();
  console.log(data);
  setTemp(data);  
} 

useEffect(() => {
  fetchFunc(dirPath);
}, []);

console.log({temp});

    return (
        <div>temp</div>
    )
}

export default temp2;