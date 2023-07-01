import React, { useEffect, useState } from 'react'

const temp3 = () => {

  const arr1 = [{a: 1, b: 2, c: 3}, {d: 4, e: 5, f: 6}];

  const modifiedArr1 = arr1.map((item, index) => {
    return { id: index + 1, ...item  };
});

console.log(modifiedArr1);


  return (
    <div>

    </div>
  );
}

export default temp3;