import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';
import { gridColumnPositionsSelector } from '@mui/x-data-grid';

export default async function handler(req, res) {

  const objArr = req.body;
  console.log('req.body is: ', objArr);

  let nonExisting = [];

  // connect to db and insert business - leave out any duplicates
  try {
    await dbConnect();
    console.log('connected to db');

    for (let i = 0; i < objArr.length; i++) {
      let { id, name, url, search } = objArr[i];

      let domain = new URL(url);
      url = domain.hostname;

      if (url.includes('www.')) {
        url = url.replace('www.', '');
      }

      if (!await Business.findOne({ url: url })) {
        const businessEntry = await Business.create({ name, url, search });
        nonExisting.push({ id: id, name: name, url: url, search: search });
      }
    }

    if (nonExisting) {
      if (nonExisting.length > 0) {
        console.log('nonExisting is: ', nonExisting);
      } else {
        console.log('nonExisting is empty');
      }
    }

    return res.status(200).send(JSON.stringify(nonExisting));

  } catch (err) {
    return res.status(200).send({ error: err.message })
  }
}