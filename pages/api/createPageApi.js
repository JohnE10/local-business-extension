import { fetchUrlData } from './backEndHelpers';

const fs = require('fs');


const createPageApi = async (req, res) => {

    const cheerio = require('cheerio');

    const commentRegEx = /<!--.*?-->/gs;

    setTimeout(async () => {
        const url = req.query.url;
        // console.log('url: ', url);
        const replaceStr = req.query.replaceStr;
        // console.log('replaceStr: ', replaceStr);

        try {

            const parsedUrl = new URL(url);
            let fileToCreate = 'siteFiles/' + parsedUrl.pathname.replace(replaceStr, '').replaceAll('/', '') + '.html';
            // console.log('modified pathname: ', parsedUrl.pathname.replace(replaceStr, '').replaceAll('/', ''));
            if (parsedUrl.pathname.replace(replaceStr, '').replaceAll('/', '') == '') {
                fileToCreate = 'siteFiles/index.html';
            }

            // console.log('fileToCreate: ', fileToCreate);

            const html = await fetchUrlData(url);

            if (html.success) {

                // load cheerio
                let $ = cheerio.load(html.success);
                $('svg').remove();

                // handle images
                let images = $('body').find('img');
                let styles = $('body').find('style');
                

                //replace <img> tags with img, src, width, height
                images.each((i, el) => {
                    const imgAttr = $(el).attr('src');

                    if ($(el).attr('width')) {
                        let imgWidth = $(el).attr('width');
                        let imgHeight = $(el).attr('height');
                        imgWidth = imgWidth.replace('px', '').replace('rem', '').replace('em', '');
                        imgHeight = imgHeight.replace('px', '').replace('rem', '').replace('em', '');
                        $(`img[src='${imgAttr}']`).replaceWith(`<img src='${imgAttr}' alt='/' width='${imgWidth}' height='${imgHeight}' >`);
                    }
                    else {
                        $(`img[src='${imgAttr}']`).replaceWith(`<img src='${imgAttr}' alt='/' width='150' height='150' >`);
                    }
                });

                // make style abide by next.js rules
                styles.each((i, el) => {
                    let elementHtml = $(el).html();
                    let attrId = '';
                    let attrClass = '';
                    if ($(el).attr('id')) {
                      attrId = $(el).attr('id');
                    //   console.log('attrId: ', attrId);
                    }
                
                    if ($(el).attr('class')) {
                      attrClass = $(el).attr('class');
                    //   console.log('attrClass: ', attrClass);
                    }
                
                    if (attrId != '') {
                      $('body').find(`style[id="${attrId}"]`).replaceWith(`<style id='${attrId}' class='${attrClass}'>` + '{`' + $(el).html() + '`}' + '</style>')
                    }
                    else if(attrClass != '') {
                      $('body').find(`style[class="${attrClass}"]`).replaceWith(`<style id='${attrId} class='${attrClass}''>` + '{`' + $(el).html() + '`}' + '</style>')
                    }
                    else {
                        $('body').find(`style`).replaceWith(`<style>` + '{`' + $(el).html() + '`}' + '</style>')
                    }
                
                  });

                let body = $('body').html();

                // remove html comments
                body = body.replaceAll(commentRegEx, '');
                // replace class with className
                body = body.replaceAll('class=', 'className=');
                // replace img with Image tag
                body = body.replaceAll('<img', '<Image');

                // Make Image tag self closing
                body = body.replace(/<Image.*?>/g, (match) => {
                    if (!match.endsWith('/>')) {
                        return `${match}needsClosingSlash>`;
                    }
                    return match;
                });

                body = body.replaceAll('>needsClosingSlash>', ' />');



                // save file
                fs.writeFileSync(fileToCreate, body);
                return res.json({ success: 'Page created.' })
            }
            else if (html.error) {
                throw Error(html.error);
            }

        } catch (err) {
            console.log(err.message);
            return res.json({ error: err.message });
        }
    }, 1000);





}

export default createPageApi;

