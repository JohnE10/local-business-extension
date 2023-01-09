import Business from '../../models/business';
import { dbConnect } from '../../middleware/dbConnect';

export default async function handler(req, res) {

    await dbConnect();
    console.log('connected to db');

    let visited = [];
    let notVisited = [];

    try {
        let urlArr = [
            'https://lafirme.quebec/',
            'https://leonardagenceweb.com/?utm_source=google&utm_medium=organic&utm_campaign=gmb',
            'http://unikmedia.ca/',
            'https://netleaf.ca/',
            'https://www.gourouweb.com/',
            'https://www.ixmedia.com/?utm_source=google&utm_medium=organic&utm_campaign=MyBusiness',
            'http://www.novaxis.net/',
            'https://www.instynctweb.com/',
            'http://www.nurun.com/',
            'https://www.jbimpact.com/',
            'http://www.libeo.com/',
            'https://wdi.solutions/',
            'https://yankeemedia.ca/',
            'http://agenceamiral.com/',
            'https://yoomweb.com/',
            'https://www.imasterweb.com/',
            'https://infernal.media/',
            'https://www.webself.net/',
            'https://quotaweb.com/',
            'http://www.volcan.design/',
            'https://webventure.ca/',
            'https://whitecrowstudios.ca/',
            'http://www.propagandadesign.com/',
            'https://www.effetmonstre.com/',
            'https://progexpert.com/',
            'https://firmecreative.com/',
            'https://o2web.ca/',
            'https://sebastienpaquet.ca/',
            'https://agenceflex.ca/',
            'http://ologix.ca/',
            'http://www.dialoguenet.ca/',
            'http://www.pyxel.ca/',
            'https://totemweb.design/',
            'https://www.webchallenge.ca/',
            'https://wibo.ca/?utm_source=GMB&utm_medium=Googlemybusiness&utm_campaign=Adsearchmedia',
            'http://www.sitequebec.ca/',
            'https://capitaleweb.ca/',
            'https://www.atelierhyper.com/',
            'http://transistordesign.com/',
            'http://www.bisscomm.com/',
            'https://cansoft.com/fr/referencement-quebec.html',
            'http://col-lab.ca/',
            'http://petitemarianne.com/',
            'http://klarr.agency/',
            'http://omnigo.ca/',
            'https://www.graphsynergie.com/',
            'https://www.kabane.ca/',
            'http://vizemedia.com/',
            'http://ep4.com/',
            'http://charlesdarras.com/',
            'https://www.rssolutionsnumeriques.com/',
            'https://www.inusti.com/',
            'https://noovoweb.com/',
            'http://webhostian.com/',
            'https://triomphe.ca/',
            'http://ilovebeet.com/',
            'http://www.alphatek.ca/',
            'https://olspsystem.com/join/496614',
            'http://www.relation1.ca/',
            'https://www.bkomstudios.com/',
            'http://khalilyabi.com/',
            'http://beenox.com/',
            'http://oxyca.ca/',
            'http://www.imarcom.net/',
            'https://mambomambo.ca/',
            'https://philnaud.ca/',
            'http://www.devalto.com/',
            'https://kumojin.com/',
            'http://spektrummedia.com/',
            'http://www.nexapp.ca/',
            'https://www.crakmedia.com/',
            'http://www.corsairedesign.com/',
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