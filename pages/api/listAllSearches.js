import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

const handler = async (req, res) => {

    let searchQuery = '';
    let searchQueryResult = [];

    // console.log('req.query: ', req.query);

    try {
        searchQuery = req.query.searchQuery.trim();
        console.log('searchQuery: ', searchQuery);

        // db connect
        await dbConnect();
        console.log('connected to db');

        // searchQueryResult = await Business.find({ search: searchQuery }, {search: 1, _id:0});
        // const results = await Business.find().limit(3).skip(100);
        const results = await Business.find();


        if (results.length > 0) {

            // console.log('searchQueryResult: ', searchQueryResult);
            // searchQueryResult = results.map((ele) => {
                results.map((ele) => {
                // console.log(ele.search);
                // if(ele.search.includes('hamilton')) {
                //     console.log(ele.search);
                // }
                // else {
                //     console.log('not found');
                // }

                if (ele.search) {
                    if (ele.search.includes(searchQuery)) {
                        console.log(ele.search);
                        searchQueryResult.push(ele.search);
                    }
                }

            })

            res.json(searchQueryResult);
        }
        else {
            console.log('no results fouond for that searchQuery.')
            res.json('no results fouond for that searchQuery.');
        }
    } catch (err) {
        console.log(err.message);
        res.json(`Error: ${err.message}`);
    }



}

export default handler;