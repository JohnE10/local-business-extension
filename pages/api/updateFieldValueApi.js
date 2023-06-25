import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

export default async function handler(req, res) {

    let queryName = req.query.queryName;
    let queryValue = req.query.queryValue;


    console.log('queryName: ', queryName);
    console.log('queryValue: ', queryValue);

    // connect to db and insert business - leave out any duplicates
    await dbConnect();
    console.log('connected to db');

    // let search = 'glass repair san antonio, tx';

    let deletedArr = [];
    let results = [];
    let tempResults = null;

    let obj = {};
    obj[queryName] = queryValue;
    console.log('obj: ', obj);

    try {

        // // if (await Business.find(obj)) {
        // if (await Business.find({ queryName: { $type: 10 } })) {
        //     results = await Business.find({ queryName: { $type: 10 } })
        //     // console.log('results: ', results);
        // }

        results = await Business.find({ queryName: {$eq: ""} });
        console.log('results: ', results.url);


        console.log('Done');

        return res.status(200).json({ success: results })

    } catch (err) {
        console.log('api/updateFieldValueApi error:', err.message)
        console.log('Done');
        return res.status(200).json({ error: `api/updateFieldValueApi error: ${err.message}` });
    }

}
