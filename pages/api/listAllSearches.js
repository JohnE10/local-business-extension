import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

const handler = async (req, res) => {

    let searchQuery = '';
    let searchQueryResult = '';

    // console.log('req.query: ', req.query);

    try {
        searchQuery = req.query.searchQuery;
        console.log('searchQuery: ', req.query.searchQuery);

        // db connect
        await dbConnect();
        console.log('connected to db');

        searchQueryResult = await Business.find({ search: searchQuery });

        if (searchQueryResult.length > 0) {
            console.log('searchQueryResult: ', searchQueryResult);
            res.json(searchQueryResult);
        }
        else {
            console.log('no results fouond for that searchQuery.')
            res.json('no results fouond for that searchQuery.');
        }
    } catch (err) {
        console.log(err.message);
    }



}

export default handler;