import Sandbox from '../../models/sandbox';
import { dbConnect } from '../../middleware/dbConnect';
import { stringContains } from '../../utils/helpers';



export default async function handler(req, res) {

    let queryName = req.query.queryName;
    let queryValue = req.query.queryValue;


    // const temp = { queryName, queryValue };

    console.log('queryName: ', queryName);
    console.log('queryValue: ', queryValue);

    // regex search
    const searchRegEx = new RegExp(`^.*${queryValue}.*$`, 'i');

    console.log('rsearchRegEx: ', searchRegEx);

    // punctuation regex
    const punctuationRegEx = /[^\w\s]/g;

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
        if (queryName == 'search') {
            results = await Sandbox.find();
            // console.log('results:', results);
            if (results) {
                if (results.length > 0) {
                    let queryArr = [];
                    if (queryValue) {
                        queryValue = queryValue.trim()
                        queryValue = queryValue.replace(/\s+/g, ' ');
                        // remove punctuation, if there is any
                        if (punctuationRegEx.test(queryValue)) {
                            queryValue = queryValue.replace(punctuationRegEx, "");
                        }

                        // split queryValue by spaces into an array
                        queryArr = queryValue.split(' ');

                        queryArr = queryArr.map((ele) => {
                            return '-:-' + ele.trim() + '-:-';
                        });

                        console.log('queryArr: ', queryArr);
                    }
                    let tempArr = [];
                    results = results.map((ele) => {
                        let searchValue = ele.search;
                        // console.log('searchValue:', searchValue);
                        // remove punctuation and add space to the front and end of string, if there is any
                        if (punctuationRegEx.test(searchValue)) {
                            // searchValue = searchValue.replace(/[^\w\s]/g, "");
                            searchValue = searchValue.replace(punctuationRegEx, "");
                        }

                        searchValue = ' ' + searchValue + ' ';
                        // replace spaces with the special characters
                        searchValue = searchValue.replaceAll(' ', '-:-');
                        // console.log('searchValue:', searchValue);

                        // if (stringContains(searchValue, queryArr)) {
                        //     console.log('ele:', ele.search);
                        //     return ele;
                        // }

                        if (stringContains(searchValue, queryArr)) {
                            // console.log('ele:', ele.search);
                            tempArr.push(ele);
                        }



                    })
                    results = tempArr;
                    // console.log('tempArr', tempArr);
                    console.log('results:', results);
                    

                }
            }
            else {
                results = "No data found"
            }

        }
        else {
            results = await Sandbox.find(obj, { _id: 0 });
        }

        // if (results) {
        //     if (results.length > 0) {
        //         console.log('results[0]: ', results[0])
        //         if (results[0].search) {
        //             // console.log('results[0].search: ', results[0].search);
        //         }
        //     }
        // }

        console.log('Done');

        // console.log('results:', results.toString());
        return res.status(200).json({ success: results })

    } catch (err) {
        console.log('searchDatabaseApi error:', err.message)
        console.log('Done');
        return res.status(200).json({ error: `searchDatabaseApi error: ${err.message}` });
    }



}
