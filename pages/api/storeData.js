import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';
import { isValidUrl } from '../../utils/helpers';

export default async function handler(req, res) {

  const objArr = req.body;
  // console.log('req.body is: ', objArr);

  let nonExisting = [];

  const excludeUrls = ['example.com, facebook.com, m.facebook.com'];

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
              // console.log('no url document has been created');

            }
            else {
              const businessEntry = await Business.updateOne({ url: objArr[i]['url'] }, { $set: objArr[i] });
              // console.log('no url document has been updated');
            }

          }
          else if (!await Business.findOne({ url: objArr[i]['url'] })) {
            const businessEntry = await Business.create(objArr[i]);
            // console.log(`${objArr[i]['url']} has been created`);

          }
          else {
            if (await Business.findOne({ email: 'no email'})) {
              const businessEntry = await Business.updateOne({ url: objArr[i]['url'] }, { $set: objArr[i] });
              // console.log(`${objArr[i]['url']} has been updated`);
            }

          }
        }
      }

    }

    console.log('Done')
    return res.status(200).send(JSON.stringify(nonExisting));

  } catch (err) {
    return res.status(200).send({ error: err.message })
  }

}