import React, { useEffect, useState } from 'react'
import { deleteKeyValue, findValueInObjArr, locations, stringContains } from '../utils/helpers';

const temp3 = () => {

  const obj = [{ a: 1, b: 2}, {a: 3, b: 'x' }];

  const m = 1;

  // const valueArr = Object.values(obj);
  // if(valueArr.includes(obj['d'])) {
  //   console.log('true');
  // }
  // else {
  //   console.log('false');
  // }

  console.log(findValueInObjArr(obj, 'a', m));







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