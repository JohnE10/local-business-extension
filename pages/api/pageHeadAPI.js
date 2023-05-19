import script from 'next/script';
import { fetchUrlData } from './backEndHelpers';
import { randomStr, styleAttrToNext } from '../../utils/helpers';

const fs = require('fs');

const pageHeadAPI = async (req, res) => {

    const cheerio = require('cheerio');

    try {

        const siteFileDir = 'siteFiles/';
        const replaceStr = 'blog/';
        const metaRegEx = /<meta([^>]*)>/g;

        const stylesheetFile = siteFileDir + 'helperFiles/index.html';

        const stylesheetHtml = fs.readFileSync(stylesheetFile, { encoding: 'utf8' });

        // load cheerio
        let $ = cheerio.load(stylesheetHtml);

        let tempAppHead = '';

        // add meta tag with name attribute equal viewport to tempAppHead
        let tempMeta = $('meta[name="viewport"]');
        tempMeta.each((i, el) => {
            tempAppHead = tempAppHead + $.html($(el)) + '\n';
        });

        // add title tag to tempAppHead
        let tempTitle = $('title');
        tempTitle.each((i, el) => {
            tempAppHead = tempAppHead + $.html($(el)) + '\n';
            console.log('tempHead: ', tempAppHead);
        });

        // make meta tag self-closing
        tempAppHead = tempAppHead.replaceAll(metaRegEx, '<meta$1 />');

        const appHeadJsx = `

        <>
         ${tempAppHead}
        </>
        `;

        // save file
        const appHeadCode = siteFileDir + 'appHead' + '.js';
        fs.writeFileSync(appHeadCode, appHeadJsx);


        $('meta[name="viewport"]').remove();
        $('title').remove();


        let styles = $('head').find('style');
        let scripts = $('head').find('script');

        // make style tags adhere to next.js rules
        styles.each((i, el) => {
            const temp = $(el).text();
            if ($(el).text().trim() != '') {
                $(el).text('{`' + temp + '`}');
            }
        });

        // make script adhere to next.js rules
        scripts.each((i, el) => {
            const temp = $(el).text();
            if ($(el).text().trim() != '') {
                $(el).text('{`' + temp + '`}');
            }
        });

        // head tag
        let head = $.html('head');

        // // commment out comments
        // const commentRegEx = /<!--.*?-->/gs;
        // head = head.replaceAll(commentRegEx, '{/* $1 */}');
        const commentRegEx = /<!--.*?-->/gs; 
        head = head.replaceAll(commentRegEx, (match) => {
            return '{/* ' + match + ' */}';
        });

        // add jsx to style tags
        head = head.replaceAll('<style ', '<style jsx ');

        // make all link tags self closing
        const linkRegEx = /<link([^>]*)>/g;
        head = head.replaceAll(linkRegEx, '<link$1 />');

        // make all meta tags self closing
        head = head.replaceAll(metaRegEx, '<meta$1 />');

        // replace ../ with /
        head = head.replaceAll('href="../', 'href="/');

        const documentHeadCode = siteFileDir + 'documentHead' + '.js';

        const documentHeadJsx = `
        <>
         ${head}
        </>
        `;

        // save file
        fs.writeFileSync(documentHeadCode, documentHeadJsx);

        console.log('Done');

        return res.json({ success: 'Page created.', results: 'head' })

    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message });
    }

}

export default pageHeadAPI;