import script from 'next/script';
import { fetchUrlData, listFilesInDirectory } from './backEndHelpers';
import { randomStr, styleAttrToNext } from '../../utils/helpers';

const fs = require('fs');

const pageHeadAPI = async (req, res) => {

    const cheerio = require('cheerio');

    try {

        const siteFileDir = 'siteFiles/';
        const replaceStr = 'blog/';
        const metaRegEx = /<meta([^>]*)>/g;

        // const stylesheetFile = siteFileDir + 'toGetPagehead/index.html';
        const stylesheetFile = req.query.url;
        const stylesheetHtml = fs.readFileSync(stylesheetFile, { encoding: 'utf8' });

        // load cheerio
        let $ = cheerio.load(stylesheetHtml);

        let tempAppHead = '';

        // add meta tag with name attribute equal viewport to tempAppHead
        let tempMeta = $('meta[name="viewport"]');
        tempMeta.each((i, el) => {
            tempAppHead = tempAppHead + $.html($(el)) + '\n';
        });

        // // remove rel="stylesheet" tags
        // $('link[rel="stylesheet"]').remove();

        // add title tag to tempAppHead
        let tempTitle = $('title');
        tempTitle.each((i, el) => {
            tempAppHead = tempAppHead + $.html($(el)) + '\n';
            console.log('tempHead: ', tempAppHead);
        });

        // make meta tag self-closing
        tempAppHead = tempAppHead.replaceAll(metaRegEx, '<meta$1 />');
        tempAppHead = tempAppHead.replaceAll('class=', 'className=');

        const appHeadJsx =
            `
                <>
                ${tempAppHead}
                </>
            `
        ;

        // save file
        const appHeadCode = siteFileDir + 'appHead' + '.js';
        fs.writeFileSync(appHeadCode, appHeadJsx);

        $('meta[name="viewport"]').remove();
        $('title').remove();

        let styles = $('head').find('style');
        let scripts = $('head').find('script');

        // make style tags adhere to next.js rules, styles jsx needs to be moved to globals.css and inside the body selector
        let globalsCss = '';
        styles.each((i, el) => {
            const temp = $(el).text();
            if ($(el).text().trim() != '') {
                globalsCss = globalsCss + temp + '\n';
                $(el).remove();
            }
            console.log({ globalsCss });
        });

        globalsCss = globalsCss.replaceAll('<style ', '<style jsx');

        // create a separate file for css to be added to globals
        const globalsCssCode = siteFileDir + 'globalsCss' + '.css';
        fs.writeFileSync(globalsCssCode, globalsCss);

        // make script adhere to next.js rules
        scripts.each((i, el) => {

            const temp = $(el).text();
            const tag = $.html(el);
            if (!tag.includes('id=')) {
                const scriptId = randomStr(10);
                $(el).attr('id', scriptId);
            }

            if ($(el).text().trim() != '') {
                $(el).text('{`' + temp + '`}');
            }

        });

        // head tag
        let head = $.html('head');

        // commment out comments
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
        head = head.replaceAll('="../', '="/');

        // replace script with Script
        head = head.replaceAll('<script', '<Script');
        head = head.replaceAll('</script', '</Script')
        head = head.replaceAll('class=', 'className=');

        const documentHeadCode = siteFileDir + 'documentHead' + '.js';

        const documentHeadJsx = `
        <>
         ${head}
        </>
        `
            ;

        // save file
        fs.writeFileSync(documentHeadCode, documentHeadJsx);

        console.log('Done');

        return res.json({ success: 'Page created.' })

    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message });
    }
}

export default pageHeadAPI;