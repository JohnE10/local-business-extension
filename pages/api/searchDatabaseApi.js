import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

export default async function handler(req, res) {

    let queryName = req.query.queryName;
    let queryValue = req.query.queryValue;

    const temp = { queryName: queryName };


    console.log('queryName: ', queryName);
    console.log('queryValue: ', queryValue);



    // const searchRegEx = /^.*albany.*$/;
    // const searchRegEx = new RegExp(`^.*${queryValue}.*$`);
    const searchRegEx = new RegExp(`^.*${queryValue}.*$`, 'i');



    console.log('rsearchRegEx: ', searchRegEx);

    // connect to db and insert business - leave out any duplicates
    await dbConnect();
    console.log('connected to db');

    // let search = 'glass repair san antonio, tx';

    let deletedArr = [];
    let results = [];
    let tempResults = null;

    let obj = {};
    obj[queryName] = searchRegEx;
    console.log('obj: ', obj);

    try {

        if (await Business.find(obj)) {
            results = await Business.find(obj, { _id: 0 })
        }

        if (results) {
            // console.log('results: ', results);
            if (results.length > 0) {
                if (results[0].search) {
                    // console.log('results[0].search: ', results[0].search);
                }
            }

        }

        console.log('Done');

        return res.status(200).json({ success: results })

    } catch (err) {
        console.log('api/searchDatabase error:', err.message)
        console.log('Done');
        return res.status(200).json({ error: `api/searchDatabase error: ${err.message}` });
    }

    // return res.status(200).json({ success: 'Task Completed - ' + search + ' - ' + JSON.stringify(results) });

}
