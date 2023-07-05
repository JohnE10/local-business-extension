import React, { useEffect, useState } from 'react'
import { stringContains } from '../utils/helpers';

const temp3 = () => {

  const string = "I am looking for a plumber in or around Pennsylvania. Can you recommend a good plumber?";
  const queryValue = ["plumber", "pennsylvania", 'around'];
  
  if(stringContains(string, queryValue)) {
    console.log('yes');
  }
  else {
    console.log('no');
  }
  
  
  


  return (
    <div>

    </div>
  );
}

export default temp3;