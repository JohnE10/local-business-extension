import React from 'react';
import { isValidUrl } from '../utils/helpers';

const temp = () => {

  const url = 'htfetp://google.com';

  if(isValidUrl(url)) {

    console.log(url + ' is a valid url.');
  }
  else {
    console.log(url + ' is not a valid url.');
  }
  return (
    <div>temp</div>
  )
}

export default temp;
