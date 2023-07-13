import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';
import { isValidUrl } from '../../utils/helpers';

export default async function handler(req, res) {

  const objArr = req.body;
  // console.log('req.body is: ', objArr);

  let nonExisting = [];

  // entered businesses
  let businessEntries = [];

  const excludeUrls = ['example.com', 'walmart.com', 'google.com'];
  const socialPages = ['facebook.com', 'm.facebook.com', 'fb.me', 'poplme.co'];

  // connect to db and insert business - leave out any duplicates
  try {
    await dbConnect();
    console.log('connected to db');

    if (objArr) {
      const objArrKeys = Object.keys(objArr[0]);
      console.log('objArrKeys: ', objArrKeys);

      for (let i = 0; i < objArr.length; i++) {

        if (!objArr[i]['url'].includes('.gov') && !excludeUrls.includes(objArr[i]['url'])) {
          if (objArr[i]['url'] == 'no url') {
            if (!await Business.findOne({ name: objArr[i]['name'] })) {
              const businessEntry = await Business.create(objArr[i]);
              businessEntries.push(objArr[i]);
              // console.log('no url document has been created');

            }
            else {
              const businessEntry = await Business.updateOne({ url: objArr[i]['url'] }, { $set: objArr[i] });
              businessEntries.push(objArr[i]);
              // console.log('no url document has been updated');
            }

          }
          else if (!await Business.findOne({ url: objArr[i]['url'] })) {
            const businessEntry = await Business.create(objArr[i]);
            businessEntries.push(objArr[i]);
            // console.log(`${objArr[i]['url']} has been created`);

          }
          else {
            if(socialPages.includes(objArr[i]['url'])) {
              if (!await Business.findOne({ page: objArr[i]['page'] })) {
                businessEntries.push(objArr[i]);
                const businessEntry = await Business.create(objArr[i]);
              }
            }
            else if (await Business.findOne({ email: 'no email'})) {
              const businessEntry = await Business.updateOne({ url: objArr[i]['url'] }, { $set: objArr[i] });
              businessEntries.push(objArr[i]);
              // console.log(`${objArr[i]['url']} has been updated`);
            }

          }
        }
      }

    }

    console.log('Listings added to database')
    return res.status(200).json({success: businessEntries});
    // return res.status(200).send(JSON.stringify(nonExisting));

  } catch (err) {
    return res.status(200).send({ error: err.message })
  }

}