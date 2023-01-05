import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

export default async function handler(req, res) {

    await dbConnect();
    console.log('connected to db');

    let visited = [];
    let notVisited = [];

    try {
        let urlArr = [
            'https://webtechagency.ca/',
            'https://360webfirm.ca/',
            'http://www.brandrocket.ca/',
            'https://versacoretechdesigns.com/',
            'https://webberman.ca/',
            'http://urroz.ca/',
            'https://www.mellowbrewmarketing.com/',
            'http://jgaucher.ca/',
            'https://cornwallwebsitedesign.ca/',
            'https://nimbleweb.co/',
            'http://613webs.wixsite.com/mysite',
            'https://www.monsterweb.ca/',
            'http://gjinternetsolutions.com/',
            'http://www.dragonflywebcreations.com/',
            'http://theprojectmachine.ca/',
            'https://okay.network/',
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