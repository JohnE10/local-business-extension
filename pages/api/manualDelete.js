import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

export default async function handler(req, res) {

    // let search = req.query.searchQuery;

    let queryName = req.query.queryName;
    let queryValue = req.query.queryValue;

    let obj = {};
    obj[queryName] = queryValue;
    

    // connect to db and insert business - leave out any duplicates
    await dbConnect();
    console.log('connected to db');

    let deletedArr = [];
    let results = '';

    try {
        if(queryValue) {
            if (await Business.findOne(obj)) {
                // const tempDocument = Business.findOne({ queryName: queryValue });
                // console.log({queryName, queryValue});
                console.log(obj);
                results = await Business.deleteMany(obj);
                // results = await Business.deleteMany({ url: 'lee-e-duthu-electrician.business.site' });
                
            }
            else {
                throw Error('No query value');
            }
        }


        console.log(results);
        console.log('Done');

        res.status(200).json({ success: 'Task Completed - ' + queryValue + ' - ' + JSON.stringify(results) })

    } catch (err) {
        console.log('api/manualDelete error:', err.message)
        console.log('Done');
        res.status(200).json({ error: `api/manualDelete error: ${err.message}` });
    }

    // return res.status(200).json({ success: 'Task Completed - ' + search + ' - ' + JSON.stringify(results) });

}
