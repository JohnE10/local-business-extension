import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

export default async function handler(req, res) {

    await dbConnect();
    console.log('connected to db');

    let visited = [];
    let notVisited = [];

    try {
        let urlArr = [
            'https://endoh.co/',
            'http://www.studioweb.com/',
            'https://catalystdv.com/',
            'https://lafirme.quebec/',
            'http://www.aliengirl.xyz/',
            'https://www.sidekickinteractive.com/',
            'http://www.blackduckagency.com/',
            'https://monolith.agency/',
            'https://www.appnovation.com/',
            'http://www.mh.ca/',
            'http://www.mezoweb.com/',
            'http://field-office.ca/',
            'https://www.azrawweb.com/',
            'https://vibetech.org/',
            'http://www.walterinteractive.com/',
            'https://www.capermint.com/',
            'https://www.malopan.com/',
        ];

        for (let i = 0; i < urlArr.length; i++) {

            let url = urlArr[i];

            let domain = new URL(url);
            url = domain.hostname;

            if (url.includes('www.')) {
                url = url.replace('www.', '');
            }

            if (await Business.findOne({ url: url })) {
                visited.push(url);
            } else {
                notVisited.push(url);

            }
        }

        return res.status(200).send({ success: `Visited - ${(visited)} - Not Visited - ${(notVisited)}` });

    } catch (err) {
        return res.status(200).send({ error: err.message });
    }



}