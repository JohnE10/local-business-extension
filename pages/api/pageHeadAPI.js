import script from 'next/script';
import { fetchUrlData } from './backEndHelpers';
import { randomStr, styleAttrToNext } from '../../utils/helpers';

const fs = require('fs');

const pageHeadAPI = async (req, res) => {

    const cheerio = require('cheerio');

    const url = req.query.url;

    const siteFileDir = 'siteFiles/';

    let appHeadCode = siteFileDir + 'appHead' + '.js';

    try {

        const html = await fetchUrlData(url);

        // load cheerio
        let $ = cheerio.load(html.success);

        let scripts = $('head').find('script');
        let styles = $('head').find('style');
        let tagsWithStyle = $('[style]');
        let TagsWithStylesheet = $('link[rel="stylesheet"]');
        let TagsWithPreload = $('link[rel="preload"]');

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

        // make style tags adhere to next.js rules
        styles.each((i, el) => {
            let attrId = '';
            let attrClass = '';
            if ($(el).attr('id')) {
                attrId = $(el).attr('id');
            }

            if ($(el).attr('class')) {
                attrClass = $(el).attr('class');
            }

            if (attrId != '') {
                $('head').find(`style[id="${attrId}"]`).replaceWith(`<style id='${attrId}' class='${attrClass}'>` + '{`' + $(el).html() + '`}' + '</style>')
            }
            else if (attrClass != '') {
                $('head').find(`style[class="${attrClass}"]`).replaceWith(`<style id='${attrId} class='${attrClass}''>` + '{`' + $(el).html() + '`}' + '</style>')
            }
            else {
                $('head').find(`style`).replaceWith(`<style>` + '{`' + $(el).html() + '`}' + '</style>')
            }

        });

        // make css style attribute adhere to next.js rules
        tagsWithStyle.each((i, el) => {
            let styleStr = $(el).attr('style');
            if (styleStr.trim() != '') {
                styleStr = styleAttrToNext(styleStr)
                $(el).attr('style', styleStr);
            }
        });

        let tempDocumnetHead = '';

        // move style tags with attribute rel='stylesheet' to documentHeadCode
        TagsWithStylesheet.each((i, el) => {
            let temp = $.html(el);
            const linkRegEx = /<link([^>]*)>/g;
            temp = temp.replaceAll(linkRegEx, '<link$1 />');
            tempDocumnetHead = tempDocumnetHead + temp + '\n';
            // console.log('$.html(el): ', temp);
        })

        const documentHeadJsx = `
        <>
         ${tempDocumnetHead}
        </>
        `;

        const documentHeadCode = siteFileDir + 'documentHead' + '.js';

        // save file
        fs.writeFileSync(documentHeadCode, documentHeadJsx);

        TagsWithStylesheet.remove();

        let head = $('head').html();

        // comment out link tags with rel="preload"
        TagsWithPreload.each((i, el) => {
            let temp = $.html(el);
            head = head.replaceAll(temp, '{/* ' + temp + ' */}');
        });

        // make all meta tags self closing
        const metaRegEx = /<meta([^>]*)>/g;
        head = head.replaceAll(metaRegEx, '<meta$1 />');

        // make all link tags self closing
        const linkRegEx = /<link([^>]*)>/g;
        head = head.replaceAll(linkRegEx, '<link$1 />');

        // remove html comments
        const commentRegEx = /<!--.*?-->/gs;
        head = head.replaceAll(commentRegEx, '');

        // change <script> to next's <Script>
        head = head.replaceAll('<script', '<Script');
        head = head.replaceAll('</script', '</Script')
        head = head.replaceAll('"{{', '{{');
        head = head.replaceAll('}}"', '}}');
        head = head.replaceAll('crossorigin', 'crossOrigin');

        const headJsx = `
        <>
            ${head}
        </>
        `;

        // save file
        fs.writeFileSync(appHeadCode, headJsx);
        console.log('Done');
        return res.json({ success: 'Page created.', results: head })

    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message });
    }

}

export default pageHeadAPI;