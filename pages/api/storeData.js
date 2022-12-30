import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

export default async function handler(req, res) {

  const objArr = req.body;
  console.log('req.body is: ', objArr);

  // connect to db and insert business - leave out any duplicates
  try {
    await dbConnect();
    console.log('connected to db');

    for (let i = 0; i < objArr.length; i++) {
      const { name, url, search } = objArr[i];
      const entry = 0;
      if (!await Business.findOne({ url: url })) {
        const businessEntry = await Business.create({ name, url, search, entry });
      }
    }

    return res.status(200).send({ success: `Task completed! - ${JSON.stringify(objArr)}` })

  } catch (err) {
    return res.status(200).send({ error: err.message })
  }
}