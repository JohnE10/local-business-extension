import React, { useEffect, useState } from 'react'
import { stringContains } from '../utils/helpers';

const temp3 = () => {

  let string = "test, I am? looking! for 'a' {plumber} in: or (around) Pennsylvania'. [Can] you, recommend; a good plumber? Adding... more words here for punctuation.";

  // remove punctuation
  string = string.replace(/[^\w\s]/g, "");
  string = ' ' + string + ' ';

  console.log('string:', string);

  // replace spaces with the special characters
  string = string.replaceAll(' ', '-:-');

  // console.log('string:', string);

  let queryValue = ['around', 'test', 'Pennsylvania', 'pe'];

  queryValue = queryValue.map((ele) => {
    return '-:-' + ele.trim() + '-:-';
  })


  console.log(queryValue);

  console.log(stringContains(string, queryValue));






  //   if(containsAllElements(string, queryValue)) {

  //   console.log('yes');
  // }
  // else {
  //   console.log('no');
  // }



  // if(stringContains(string, queryValue)) {

  //   console.log('yes');
  // }
  // else {
  //   console.log('no');
  // }
  // console.log(queryValue)





  return (
    <div>

    </div>
  );
}

export default temp3;