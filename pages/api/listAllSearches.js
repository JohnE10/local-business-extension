import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

const handler = async (req, res) => {

    let searchQuery = '';
    let searchQueryResult = [];

    // console.log('req.query: ', req.query);

    try {
        searchQuery = req.query.searchQuery.trim();
        console.log('searchQuery: ', searchQuery);

        const regex = new RegExp(searchQuery, 'i');
        console.log('regex: ', regex);

        // db connect
        await dbConnect();
        console.log('connected to db');

        // searchQueryResult = await Business.find({ search: searchQuery }, {search: 1, _id:0});
        // const results = await Business.find().limit(3).skip(100);
        // const results = await Business.find();
        const results = await Business.find({search: {$regex: regex}}, {search: 1, _id: 0});


        if (results.length > 0) {

            results.map((a) => {
                if(!searchQueryResult.includes(a.search)) {
                    searchQueryResult.push(a.search);
                }
                
            });

            res.json(searchQueryResult);
        }
        else {
            console.log('no results found for that searchQuery.')
            res.json('no results found for that searchQuery.');
        }
    } catch (err) {
        console.log(err.message);
        res.json(`Error: ${err.message}`);
    }
}

export default handler;