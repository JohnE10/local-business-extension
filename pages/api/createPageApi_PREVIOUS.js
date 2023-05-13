import { toCamelCase } from '../../utils/helpers';
import { fetchUrlData } from './backEndHelpers';

const fs = require('fs');


const createPageApi = async (req, res) => {

    const cheerio = require('cheerio');

    const commentRegEx = /<!--.*?-->/gs;
    const siteFileDir = 'siteFiles/';
    let pathNameArr = [];

    setTimeout(async () => {
        const url = req.query.url;
        // console.log('url: ', url);
        const replaceStr = req.query.replaceStr;
        // console.log('replaceStr: ', replaceStr);

        try {

            const parsedUrl = new URL(url);

            let urlPathName = parsedUrl.pathname.replace(replaceStr, '').replaceAll('/', '');
            urlPathName = toCamelCase(urlPathName);

            let fileToCreate = siteFileDir + urlPathName + '.js';

            if (parsedUrl.pathname.replace(replaceStr, '').replaceAll('/', '') == '') {
                fileToCreate = `${siteFileDir}index.js`;
            }

            const html = await fetchUrlData(url);

            if (html.success) {

                // load cheerio
                let $ = cheerio.load(html.success);
                $('svg').remove();

                // handle images
                let images = $('body').find('img');
                let styles = $('body').find('style');
                let scripts = $('body').find('script');


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
                    let attrId = '';
                    let attrClass = '';
                    if ($(el).attr('id')) {
                        attrId = $(el).attr('id');
                    }

                    if ($(el).attr('class')) {
                        attrClass = $(el).attr('class');
                    }

                    if (attrId != '') {
                        $('body').find(`style[id="${attrId}"]`).replaceWith(`<style id='${attrId}' class='${attrClass}'>` + '{`' + $(el).html() + '`}' + '</style>')
                    }
                    else if (attrClass != '') {
                        $('body').find(`style[class="${attrClass}"]`).replaceWith(`<style id='${attrId} class='${attrClass}''>` + '{`' + $(el).html() + '`}' + '</style>')
                    }
                    else {
                        $('body').find(`style`).replaceWith(`<style>` + '{`' + $(el).html() + '`}' + '</style>')
                    }

                });

                // make script abide by next.js rules
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
                        $('body').find(`Script[id="${attrId}"]`).replaceWith(`<Script id='${attrId}' class='${attrClass}'>` + '{`' + $(el).html() + '`}' + '</Script>')
                    }
                    else if (attrClass != '') {
                        $('body').find(`Script[class="${attrClass}"]`).replaceWith(`<Script id='${attrId} class='${attrClass}''>` + '{`' + $(el).html() + '`}' + '</Script>')
                    }
                    else {
                        $('body').find(`Script`).replaceWith(`<Script>` + '{`' + $(el).html() + '`}' + '</Script>')
                    }

                });

                // if YT video, use Next Video Compnent
                if (html.success.includes('youtube.com')) {
                    const iframes = $('body').find('iframe');
                    iframes.each((i, el) => {
                        if ($(el).attr('src')) {
                            if ($(el).attr('src').includes('youtube.com')) {
                                if ($('body').find('iframe').attr('src')) {
                                    const ytVideoSrc = $('body').find('iframe').attr('src');
                                    if (ytVideoSrc != '') {
                                        const videoId = extractVideoId(ytVideoSrc);
                                        // console.log('videoId: ', videoId);
                                        $('body').find(`iframe[src="${ytVideoSrc}"]`).replaceWith(`
                                        <LiteYouTubeEmbed
                                        id=${videoId}
                                        title='YouTube video player'
                                        />
                                        `)
                                    }
                                }


                            }
                        }
                    });

                }

                //Set body to the newly modified html
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

                // maneuver to make image tags self closing
                body = body.replaceAll('>needsClosingSlash>', ' />');

                // make any hr tag self closing
                const hrRegEx = /<hr([^>]*)>/g;
                body = body.replaceAll(hrRegEx, '<hr$1 />');

                // make sure LiteYouTubeEmbed is of the right case format and is self closing
                body = body.replaceAll('liteyoutubeembed', 'LiteYouTubeEmbed');

                // change <script> to next's <Script>
                body = body.replaceAll('<script', '<Script');
                body = body.replaceAll('</script', '</Script')

                // construct next.js page
                const nextPage = `
                import Image from 'next/image';
                import Script from 'next/script';
                import LiteYouTubeEmbed from "react-lite-youtube-embed"
                import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

                const ${fileToCreate.replace('.js', '').replaceAll(siteFileDir, '')} = () => {
                    return (
                        <>
                            ${body}
                        </>
                    )    
                }
                export default ${fileToCreate.replace('.js', '')};
                `

                // save file
                fs.writeFileSync(fileToCreate, nextPage);
                // return res.json({ success: 'Page created.' })
            }
            else if (html.error) {
                throw Error(html.error);
            }

        } catch (err) {
            console.log(err.message);
            return res.json({ error: err.message });
        }
    }, 1000);

    return res.json({ success: 'Page created.' })

}

export default createPageApi;

// export const fixStyleAndScript = (styles) => {

//     styles.each((i, el) => {
//         let attrId = '';
//         let attrClass = '';
//         if ($(el).attr('id')) {
//           attrId = $(el).attr('id');
//         }

//         if ($(el).attr('class')) {
//           attrClass = $(el).attr('class');
//         }

//         if (attrId != '') {
//           $('body').find(`style[id="${attrId}"]`).replaceWith(`<style id='${attrId}' class='${attrClass}'>` + '{`' + $(el).html() + '`}' + '</style>')
//         }
//         else if(attrClass != '') {
//           $('body').find(`style[class="${attrClass}"]`).replaceWith(`<style id='${attrId} class='${attrClass}''>` + '{`' + $(el).html() + '`}' + '</style>')
//         }
//         else {
//             $('body').find(`style`).replaceWith(`<style>` + '{`' + $(el).html() + '`}' + '</style>')
//         }

//       });

// };

export const extractVideoId = (url) => {
    const regExp = /\/embed\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regExp);
    if (match && match[1]) {
        return match[1];
    } else {
        console.error("Invalid YouTube URL");
    }
}