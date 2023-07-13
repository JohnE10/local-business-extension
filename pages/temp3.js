import React, { useEffect, useState } from 'react'
import { deleteKeyValue, findValueInObjArr, locations, stringContains } from '../utils/helpers';

const temp3 = () => {

  const arr = ['a', 'b', 'c']

  // const str = arr.join(' ');
  console.log(str);

stringContains(str, arr);





  return (
    <div>results</div>
    // <div>{tempObj[0]['url']}</div>
  )

}




export default temp3;

export const getFetchData = async (endPoint) => {

  const response = await fetch(endPoint);
  const results = await response.json();

  // console.log('getFetchData() results:', results);

  if (results.success) {
    const data = results.success;
    return data;
  }
  else if (results.error) {
    return results.error;
  }

};