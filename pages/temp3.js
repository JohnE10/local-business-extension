import React, { useEffect, useState } from 'react'
import { locations, stringContains } from '../utils/helpers';

const temp3 = () => {

  async function fetchData() {
    // Simulating an asynchronous operation with a setTimeout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Data fetched!');
      }, 5000); // Simulating a 2-second delay
    });
  }


  async function myFunction() {
    // Wait for the fetchData function to complete before moving on
    const result = await fetchData();

    // Once the fetchData function is finished, this line will execute
    console.log(result);
    console.log('done');
  }

  myFunction();







  return (
    <div>temp</div>
  )

}




export default temp3;