import React from 'react'

const apiTemp3 = async (req, res) => {

  const tempBody = 'test body'
  // const response = await fetch('http://localhost:3000/api/apiTemp2', {
    const response = await fetch('http://localhost:3000/api/apiTemp2', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(tempBody)
  });
  const data = await response.json();
  console.log({ data });

  return res.send(data);

  //   const sendDataToDB = async (objArr) => {
  //     const url = '/api/storeData';
  //     response = await fetch(url, {
  //         method: 'POST',
  //         headers: {
  //             'content-type': 'application/json'
  //         },
  //         body: JSON.stringify(objArr)
  //     });
  //     // setData(await response.json());
  //     // console.log('response is: ', response);
  // };

  return (
    <div>apiTemp3</div>
  )
}

export default apiTemp3;