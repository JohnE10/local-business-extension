import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

export default async function handler(req, res) {

    // connect to db and insert business - leave out any duplicates
    try {

        await dbConnect();
        console.log('connected to db');

        // const tempObj = [
        //     { name: 'Blue Water Agency', url: 'https://bluewateragency.com/', search: 'temp' },
        //     { name: 'GrowME Marketing', url: ' https://growmemarketing.com/', search: 'temp' },
        //     { name: 'Spark Business Works', url: ' https://digitalshift.ca/', search: 'temp' },
        //     { name: 'Digital Shift Media', url: 'https://sparkbusinessworks.com/', search: 'temp' },
        //     { name: 'Digital Shift Media', url: 'https://digitalshiftmedia.com/', search: 'temp' },
        //     { name: 'Digital Shift', url: 'https://palo-it.com/', search: 'temp' },
        //     { name: 'Digital Shift', url: 'https://cogniscientdigital.com/', search: 'temp' },
        //     { name: 'Digital Shift', url: 'https://nimbleagency.com/', search: 'temp' },
        //     { name: 'Digital Shift', url: 'https://www.webscribblesolutions.com/', search: 'temp' },
        //     { name: 'Digital Shift', url: 'https://www.growmarketing.ca/', search: 'temp' },
        //     { name: 'Digital Shift', url: 'https://www.webware.io/', search: 'temp' },
        //     { name: 'Digital Shift', url: 'https://www.web4realty.com/', search: 'temp' },
        //     { name: 'Digital Shift', url: 'https://www.wsidigitalweb.com/', search: 'temp' },
        //     { name: 'Digital Shift', url: 'https://www.binary.com/', search: 'temp' },
        //     { name: 'Digital Shift', url: 'https://www.fusion360.com/', search: 'temp' },
        //     { name: 'Digital Shift', url: 'https://www.elixir.com/', search: 'temp' },
        //     { name: 'Digital Shift', url: 'https://www.twelvetwelve.com/', search: 'temp' },
        // ];

        const tempObj = [
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

        let inserted = [];
        let notInserted = [];

        if (typeof tempObj[0] === 'string') {

            console.log('typeof tempObj: ', typeof tempObj[0])


            // insert from array
            for (let i = 0; i < tempObj.length; i++) {
                let url = tempObj[i];

                let domain = new URL(url);
                url = domain.hostname;

                if (url.includes('www.')) {
                    url = url.replace('www.', '');
                }

                let name = '';
                let search = 'web development agency cornwall, ontario';

                if (!await Business.findOne({ url: url })) {
                    const businessEntry = await Business.create({ name, url, search });
                    inserted.push({ name, url, search })
                } else {
                    notInserted.push({ name, url, search })
                }
            }
        } else if (typeof tempObj[0] === 'object') {
            // insert from object
            for (let i = 0; i < tempObj.length; i++) {
                let { name, url, search } = tempObj[i];

                let domain = new URL(url);
                url = domain.hostname;

                if (url.includes('www.')) {
                    url = url.replace('www.', '');
                }

                if (!await Business.findOne({ url: url })) {
                    const businessEntry = await Business.create({ name, url, search });
                    inserted.push({ name, url, search })
                } else {
                    notInserted.push({ name, url, search })
                }
            }
        }

        return res.status(200).send({ success: `Task completed! - ${JSON.stringify(inserted)}`, notInserted: notInserted })

    } catch (err) {
        return res.status(200).send({ error: err.message })
    }
}