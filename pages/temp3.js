import React, { useEffect, useState } from 'react'
import { stringContains } from '../utils/helpers';

const temp3 = () => {

  function wait(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  const temp = async () => {
    console.log('one');

    await wait(3000);
   
     console.log('two');
  }
  temp();


  return (
    <div>temp</div>
  )

}




export default temp3;