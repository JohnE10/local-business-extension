import Sandbox from '../../models/sandbox';
import { dbConnect } from '../../middleware/dbConnect';
import { deleteKeyValue, isValidUrl } from '../../utils/helpers';

export default async function handler(req, res) {

    const objArr = req.body;
    // console.log('req.body is: ', objArr);
    // console.log('obj url:', objArr[0]['url']);
    console.log({ objArr });


    let nonExisting = [];

    // added entries
    let businessEntries = [];

    const excludeUrls = ['example.com', 'walmart.com', 'google.com'];
    const socialPages = ['facebook.com', 'm.facebook.com', 'fb.me', 'poplme.co'];

    // connect to db and insert business - leave out any duplicates
    try {
        await dbConnect();
        console.log('connected to db');

        if (objArr) {
            // const objArrKeys = Object.keys(objArr[0]);
            // console.log('objArrKeys: ', objArrKeys);

            // get mongodb model headers and remove the 2 unwanted keys
            let headers = Object.keys(Sandbox.schema.obj);
            headers = headers.filter((element) => element != 'numberOfEmails' && element != 'dateEmailedLast');
            // console.log({headers});

            for (let i = 0; i < objArr.length; i++) {

                if (!objArr[i]['url'].includes('.gov') && !excludeUrls.includes(objArr[i]['url'])) {

                }
            }

        }

        console.log('Listings added to database');

        return res.status(200).json({ success: businessEntries });
        // return res.status(200).send(JSON.stringify(nonExisting));

    } catch (err) {
        return res.status(200).send({ error: err.message })
    }

}