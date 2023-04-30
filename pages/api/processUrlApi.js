

const processUrlApi = async (req, res) => {

    try {

        const url = req.query.url;

        const response = await fetch(url);
        if (!response.ok) {
            throw Error('Unable to fetch data from provided resource.')
        }

        const data = await response.text();

        console.log('Done!');

        res.json({success: data});

    } catch (err) {
        console.log(err.message);
        res.json({error: err.message});
    }

}

export default processUrlApi;