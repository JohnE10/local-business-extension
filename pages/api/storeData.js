import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';
import { isValidUrl } from '../../utils/helpers';

export default async function handler(req, res) {

  const objArr = req.body;
  // console.log('req.body is: ', objArr);

  let nonExisting = [];

  // connect to db and insert business - leave out any duplicates
  try {
    await dbConnect();
    console.log('connected to db');

    if (objArr) {
      const objArrKeys = Object.keys(objArr[0]);
      console.log('objArrKeys: ', objArrKeys);

      for (let i = 0; i < objArr.length; i++) {

        objArrKeys.map(async (ele) => {
          if (ele == 'url') {
            if (objArr[i][ele] != '') {
              if (isValidUrl(objArr[i][ele])) {
                let domain = new URL(objArr[i][ele]);
                if (domain.hostname) {
                  let temp = domain.hostname;
                  objArr[i][ele] = temp.replace('www.', '');
                }
              }


            }
          }
        });

        // remove the id key and its value from objArr
        delete objArr[i].id;

        if (!await Business.findOne({ url: objArr[i]['url'] })) {
          const businessEntry = await Business.create(objArr[i]);
          console.log(`${objArr[i]['url']} has been created`);

        }
        else if (objArr[i]['url'] == 'no url') {
          if (!await Business.findOne({ name: objArr[i]['name'] })) {
            const businessEntry = await Business.create(objArr[i]);
            console.log('no url document has been created');

          }
          else {
            const businessEntry = await Business.updateOne({ url: objArr[i]['url'] }, { $set: objArr[i] });
            console.log('no url document has been updated');
          }

        }
        else {
          const businessEntry = await Business.updateOne({ url: objArr[i]['url'] }, { $set: objArr[i] });
          console.log(`${objArr[i]['url']} has been updated`);
        }
      }
    }

    console.log('Done')
    return res.status(200).send(JSON.stringify(nonExisting));

  } catch (err) {
    return res.status(200).send({ error: err.message })
  }
  
}