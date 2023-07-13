import React from 'react'
import Business from '../../models/business';

const apiTemp3 = async (req, res) => {

  let headers = Object.keys(Business.schema.obj);
  // headers = headers.filter((element) => element != 'numberOfEmails' && element != 'dateEmailedLast');

  // console.log({headers});

const tempObj = await Business.findOne({url: 'galcanelectric.com'});

const objId = tempObj._id;
console.log(objId);

const tempObj2 = await Business.findOne(objId);
console.log({tempObj2});

// console.log(typeof objId);






  return res.send('temp');

  return (
    <div>apiTemp3</div>
  )
}

export default apiTemp3;