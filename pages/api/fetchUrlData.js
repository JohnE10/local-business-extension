const handler = async (req, res) => {

    const url = req.query.url

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error('Did not get a response from server.');
        }

        const data = await response.text();
        // console.log(data);
        console.log('Done');

        return res.status(200).json({ success: data });

    } catch (err) {
        console.log(err);
        return res.status(200).json({ error: err.message });
    }

}

export default handler;



