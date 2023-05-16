import script from 'next/script';
import { fetchUrlData } from './backEndHelpers';
import { styleAttrToNext } from '../../utils/helpers';

const fs = require('fs');

const pageHeadAPI = async (req, res) => {

    const cheerio = require('cheerio');

    const url = req.query.url;

    const siteFileDir = 'siteFiles/';

    let fileToCreate = siteFileDir + 'jsxHead' + '.js';

    try {

        const html = await fetchUrlData(url);

        // load cheerio
        let $ = cheerio.load(html.success);

        let scripts = $('head').find('script');
        let styles = $('head').find('style');
        let tagsWithStyle = $('[style]');

        // make script adhere to next.js rules
        scripts.each((i, el) => {

            let attrId = '';
            let attrClass = '';
            if ($(el).attr('id')) {
                attrId = $(el).attr('id');
            }

            if ($(el).attr('class')) {
                attrClass = $(el).attr('class');
            }

            if (attrId != '') {
                $('head').find(`script[id="${attrId}"]`).replaceWith(`<script id='${attrId}' class='${attrClass}'>` + '{`' + $(el).html() + '`}' + '</script>')
            }
            else if (attrClass != '') {
                $('head').find(`script[class="${attrClass}"]`).replaceWith(`<script id='${attrId} class='${attrClass}''>` + '{`' + $(el).html() + '`}' + '</script>')
            }
            else {
                $('head').find(`script`).replaceWith(`<script>` + '{`' + $(el).html() + '`}' + '</script>')
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

        let head = $('head').html();

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

        // console.log('head: ', head);

        const headJsx = `
        <>
        ${head}
        </>
        `;

        // save file
        fs.writeFileSync(fileToCreate, headJsx);
        return res.json({ success: 'Page created.', results: head })

    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message });
    }

}

export default pageHeadAPI