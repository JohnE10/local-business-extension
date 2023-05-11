import { fetchUrlData } from './backEndHelpers';

const fs = require('fs');


const createPageApi = async (req, res) => {

    const cheerio = require('cheerio');

    const commentRegEx = /<!--.*?-->/gs;

    setTimeout(async () => {
        const url = req.query.url;
        console.log('url: ', url);
        const replaceStr = req.query.replaceStr;
        console.log('replaceStr: ', replaceStr);

        try {

            const parsedUrl = new URL(url);
            let fileToCreate = 'siteFiles/' + parsedUrl.pathname.replace(replaceStr, '').replaceAll('/', '') + '.html';
            // console.log('modified pathname: ', parsedUrl.pathname.replace(replaceStr, '').replaceAll('/', ''));
            if(parsedUrl.pathname.replace(replaceStr, '').replaceAll('/', '') == '') {
                fileToCreate = 'siteFiles/index.html';
            }

            console.log('fileToCreate: ', fileToCreate);

            const html = await fetchUrlData(url);

            // console.log(html.success);

            if (html.success) {

                let $ = cheerio.load(html.success);
                $('svg').remove();

                let body = $('body').html();
                body = body.replaceAll(commentRegEx, '');
                body = body.replaceAll('class=', 'className=');



                fs.writeFileSync(fileToCreate, body);
                return res.json({ success: 'Page created.' })
            }
            else if (html.error) {
                throw Error(html.error);
            }
            siteFiles

        } catch (err) {
            console.log(err.message);
            return res.json({ error: err.message });
        }
    }, 1000);





}

export default createPageApi;

