export default async function handler(req, res) {

    // console.log('req: ', req);

    if (req.body.url) {
        console.log('req.body.url: ', req.body.url)

        try {
            const response = await fetch(req.body.url);
            const data = await response.text();

            return res.status(200).send(data);
        } catch (err) {
            console.log(err);
            return res.status(200).send(err.message);
        }

    }
}



