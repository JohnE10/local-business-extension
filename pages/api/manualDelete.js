import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

export default async function handler(req, res) {

    let search = req.query.searchQuery;

    // connect to db and insert business - leave out any duplicates
    await dbConnect();
    console.log('connected to db');

    let deletedArr = [];
    let results = '';

    try {
        if (await Business.find({ search: search })) {
            results = await Business.deleteMany({ search: search })
        }

        console.log(results);
        console.log('Done');

        res.status(200).json({success: 'Task Completed - ' + search + ' - ' + JSON.stringify(results)})

    } catch (err) {
        console.log('api/manualDelete error:', err.message)
        console.log('Done');
        res.status(200).json({error: `api/manualDelete error: ${err.message}`});
    }

    // return res.status(200).json({ success: 'Task Completed - ' + search + ' - ' + JSON.stringify(results) });

}
