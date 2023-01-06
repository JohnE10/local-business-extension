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
                let search = 'web development agency montreal, qc';

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

        return res.status(200).send({ success: `Task completed! - ${inserted}`, notInserted: notInserted })

    } catch (err) {
        return res.status(200).send({ error: err.message })
    }
}