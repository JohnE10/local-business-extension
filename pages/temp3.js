import React, { useEffect, useState } from 'react'

const temp3 = () => {

const file = 'someFile.jpfffeg';
const fileExtension = file.split('.').pop();

const unwanteExtensionsdArr = ['jpg', 'jpeg', 'png'];

if(!unwanteExtensionsdArr.includes(fileExtension)) {
  console.log(file + ' is good');
}
else {
  console.log(file + ' is not good');
}





  console.log('Done');

  return (
    <div>
      Results


    </div>
  )
}

export default temp3;