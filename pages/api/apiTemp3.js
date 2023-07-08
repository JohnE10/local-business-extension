import React from 'react'

const apiTemp3 = async () => {

  async function fetchData() {
    // Simulating an asynchronous operation with a setTimeout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Data fetched!');
      }, 5000); // Simulating a 2-second delay
    });
  }

  const result = await fetchData();
  console.log(result);
  console.log('done');

  return (
    <div>apiTemp3</div>
  )
}

export default apiTemp3;