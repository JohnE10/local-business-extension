import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';
import { deleteKeyValue, isValidUrl } from '../../utils/helpers';

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
            // console.log({headers});

            for (let i = 0; i < objArr.length; i++) {

                let tempEmailArr = [];

                if (!objArr[i]['url'].includes('.gov') && !excludeUrls.includes(objArr[i]['url'])) {

                    if (await Business.findOne({ email: objArr[i]['email'] })) {
                        console.log(`${objArr[i]['email']} email in database`);
                    }
                    else {

                        if (await Business.findOne({ url: objArr[i]['url'] })) {
                            let documents = await Business.find({ url: objArr[i]['url'] })
                            documents.map(async (document) => {

                                if (document['email'] == 'no email' || document['email'] == '') {
                                    await Business.updateOne({ _id: document['_id'] }, { $set: { email: objArr[i]['email'] } });
                                }
                                else {
                                    if(!await Business.findOne({ email: objArr[i]['email'] }))
                                    await Business.create(objArr[i]);
                                }


                            })
                        }
                        else {
                            if(objArr[i]['email']) {
                                if(!await Business.findOne({ email: objArr[i]['email'] })) {
                                    await Business.create(objArr[i]);
                                }
                            }
                        }

                        // console.log(`${objArr[i]['email']} email not in database`);
                        // const allDocuments = await Business.find();
                        // allDocuments.map(async (ele) => {

                        //     if (ele['url'] == objArr[i]['url']) {
                        //         let tempObjs = await Business.find({ url: objArr[i]['url'] });
                        //         tempObjs.map(async (tempObj) => {
                        //             if (tempObj['email'].trim() != 'no email' && tempObj['email'].trim() != '') {

                        //                 let tempObj2 = {}
                        //                 // console.log(headers);
                        //                 headers.map((ele) => {
                        //                     if (ele == 'email') {
                        //                         tempObj2[ele] = objArr[i]['email'];
                        //                         // tempEmailArr.push(objArr[i]['email']);
                        //                     }
                        //                     else {
                        //                         tempObj2[ele] = tempObj[ele];
                        //                         // tempEmailArr.push(objArr[i]['email']);
                        //                     }
                        //                 })

                        //                 if (!toBeAddedToDB.includes(tempObj2)) {
                        //                     toBeAddedToDB.push(tempObj2);
                        //                 }
                        //             }
                        //             else {
                        //                 // const businessEntry = await Business.create(objArr[i]);
                        //                 console.log('else ran')

                        //                 if (!toBeUpdatedInDB.includes(tempObj)) {
                        //                     toBeUpdatedInDB.push(tempObj);
                        //                 }
                        //             }
                        //         })
                        //     }
                        //     else {
                        //         const newObj = {};
                        //         headers.map((ele) => {

                        //             if (objArr[i][ele] == '') {
                        //                 newObj[ele] = `no ${ele}`;
                        //                 // tempEmailArr.push(objArr[i]['email']);
                        //             }
                        //             else {
                        //                 newObj[ele] = objArr[i][ele];
                        //             }
                        //         })
                        //         if (!toBeAddedToDB.includes(newObj)) {
                        //             toBeAddedToDB.push(newObj);
                        //         }
                        //     }



                        // })

                    }
                }
            }

        }

        // console.log({ toBeAddedToDB });
        // console.log({ toBeUpdatedInDB });

        // toBeAddedToDB.map(async (ele) => {
        //     const businessEntry = await Business.create(ele);
        // })

        // toBeUpdatedInDB.map(async (ele) => {
        //     if (await Business.findOne({ _id: ele['_id'] })) {
        //         await Business.updateOne({ _id: ele['_id'] }, { $set: { email: ele['email'] } });
        //     }
        //     else {
        //         console.log('could not find Id for database object');
        //     }
        // })

        console.log('Listings added to database');

        return res.status(200).json({ success: businessEntries });
        // return res.status(200).send(JSON.stringify(nonExisting));

    } catch (err) {
        return res.status(200).send({ error: err.message })
    }

}