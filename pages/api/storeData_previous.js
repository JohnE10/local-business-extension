import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

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
        // const businessEntry = await Business.create({ name, url, email, phone, rating, industry, advertising, city, state, search });
        // nonExisting.push({ id: id, name: name, url: objArr[i].url, search: search });
      } else {
        // nonExisting.push({ id: id, name: name, url: objArr[i].url, search: search });
      }
    }

    return res.status(200).send(JSON.stringify(nonExisting));

  } catch (err) {
    return res.status(200).send({ error: err.message })
  }
}