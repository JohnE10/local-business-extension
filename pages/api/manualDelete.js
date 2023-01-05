import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

export default async function handler(req, res) {

    // connect to db and insert business - leave out any duplicates


    await dbConnect();
    console.log('connected to db');

    const listings = await Business.find();
    console.log(listings);

    let search = 'web development agency dallas, tx';

    let deletedArr = [];
    let result = '';
    // let eleArr = await Business.findAll({ search: search });
    try {
        if (await Business.find({ search: search })) {
            result = await Business.deleteMany({ search: search })
        }

        res.status(200).send('Task Completed - ' + JSON.stringify(result))
    } catch (err) {
        res.status(200).send('Error: ' + err);
    }



    // for (let i = 0; i < eleArr.length; i++) {
    //     if (eleArr[i].search == search)
    //         await Business.deleteOne({ search: eleArr[i].search }, (err, result) => {
    //             if (err) {
    //                 res.send(err.message);
    //             } else {
    //                 deletedArr.push(result);
    //             }
    //         });
    // }
    // await Business.create({});
    // inserted.push({ name, url, search })


    return res.status(200).send({ success: `Task completed! - $(deletedArr)` });



}
