import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

export default async function handler(req, res) {

    // connect to db and insert business - leave out any duplicates

    await dbConnect();
    console.log('connected to db');

    // const listings = await Business.find();
    // console.log(listings);

    let search = 'dentist new york, ny';

    let deletedArr = [];
    let result = '';

    try {
        if (await Business.find({ search: search })) {
            result = await Business.deleteMany({ search: search })
        }

        res.status(200).send('Task Completed - ' + JSON.stringify(result))
    } catch (err) {
        res.status(200).send('Error: ' + err);
    }

    return res.status(200).send({ success: `Task completed! - $(deletedArr)` });

}
