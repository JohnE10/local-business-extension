import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';
import { deleteKeyValue, findValueInObjArr, isValidUrl } from '../../utils/helpers';

export default async function handler(req, res) {

    const objArr = req.body;
    console.log({ objArr });


    let nonExisting = [];

    let tempCount1 = [];
    let tempCount2 = [];
    let tempCount3 = [];



    let toBeAddedToDB = [];
    let toBeUpdatedInDB = [];

    // added entries
    let businessEntries = [];

    const excludeUrls = ['example.com', 'walmart.com', 'google.com'];
    const socialPages = ['facebook.com', 'm.facebook.com', 'fb.me', 'poplme.co'];

    // connect to db and insert business - leave out any duplicates
    try {
        await dbConnect();
        console.log('connected to db');

        if (objArr) {


            // get mongodb model headers and remove the 2 unwanted keys
            let headers = Object.keys(Business.schema.obj);
            headers = headers.filter((element) => element != 'numberOfEmails' && element != 'dateEmailedLast');
            // console.log({ headers });

            for (let i = 0; i < objArr.length; i++) {

                // console.log(toBeUpdatedInDB);

                if (!objArr[i]['url'].includes('.gov') && !excludeUrls.includes(objArr[i]['url'])) {

                    if (await Business.findOne({ email: objArr[i]['email'] })) {
                        console.log(`${objArr[i]['email']} email in database`);
                    }
                    else {

                        if (await Business.findOne({ url: objArr[i]['url'] })) {

                            let document = await Business.findOne({ url: objArr[i]['url'] });
                            if (document['email'] == 'no email' || document['email'] == '') {
                                let tempId = document['_id'].toString();
                                // console.log('findValueInObjArr: ', !findValueInObjArr(toBeUpdatedInDB, tempId));
                                if (!findValueInObjArr(toBeUpdatedInDB, 'tempId', tempId)) { // check for dupes
                                    toBeUpdatedInDB.push({ tempId, email: objArr[i]['email'] });
                                }

                                else {
                                    if (!await Business.findOne({ email: objArr[i]['email'] })) {
                                        let tempObj = {};
                                        headers.map((header) => {
                                            if (objArr[i][header]) {
                                                if (objArr[i][header] == '') {
                                                    tempObj[header] = `no ${header}`;
                                                }
                                                else {
                                                    tempObj[header] = objArr[i][header];
                                                }
                                            }
                                            else {
                                                tempObj[header] = `no ${header}`;
                                            }
                                        })


                                        if (!toBeAddedToDB.includes(tempObj)) {
                                            toBeAddedToDB.push(tempObj);
                                        }

                                    }
                                }

                            }
                            else {
                                if (objArr[i]['email']) {
                                    if (!await Business.findOne({ email: objArr[i]['email'] })) {
                                        const tempObj = {}
                                        headers.map((header) => {
                                            if (objArr[i][header]) {
                                                if (objArr[i][header] == '') {
                                                    tempObj[header] = `no ${header}`;
                                                }
                                                else {
                                                    tempObj[header] = objArr[i][header];
                                                }
                                            }
                                            else {
                                                tempObj[header] = `no ${header}`;
                                            }
                                        })

                                        if (!toBeAddedToDB.includes(tempObj)) {
                                            toBeAddedToDB.push(tempObj);
                                        }

                                    }
                                }
                            }

                        }
                        else {
                            headers.map((header) => {
                                if (objArr[i][header]) {
                                    if (objArr[i][header] == '') {
                                        tempObj[header] = `no ${header}`;
                                    }
                                    else {
                                        tempObj[header] = objArr[i][header];
                                    }
                                }
                                else {
                                    tempObj[header] = `no ${header}`;
                                }
                            })

                            if (!toBeAddedToDB.includes(tempObj)) {
                                toBeAddedToDB.push(tempObj);
                            }
                        }
                    }
                }

            }

            console.log({ toBeUpdatedInDB });
            console.log('toBeUpdateInDB.length: ', toBeUpdatedInDB.length)
            console.log({ toBeAddedToDB });
            console.log('toBeAddedToDB.length: ', toBeAddedToDB.length)

            if (toBeUpdatedInDB) {
                if (toBeUpdatedInDB.length > 0) {
                    toBeUpdatedInDB.map(async (ele) => {
                        await Business.updateOne({ _id: ele['tempId'] }, { $set: { email: ele['email'] } });
                    })
                }
            }

            if (toBeAddedToDB) {
                if (toBeAddedToDB.length > 0) {
                    toBeAddedToDB.map(async (ele) => {
                        await Business.create(ele);
                    })
                }
            }




            console.log('Listings added to database');

            return res.status(200).json({ success: 'businessEntries' });
        }
    } catch (err) {
        return res.status(200).send({ error: err.message })
    }

}