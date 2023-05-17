import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import { capFirst, randomStr, toCamelCase } from '../../utils/helpers';
import { fetchUrlData } from './backEndHelpers';
import { styleAttrToNext } from '../../utils/helpers';


const fs = require('fs');

const createPageApi = async (req, res) => {

    const cheerio = require('cheerio');

    const commentRegEx = /<!--.*?-->/gs;
    const siteFileDir = 'siteFiles/';

    const url = req.query.url;
    console.log('url: ', url);
    const replaceStr = req.query.replaceStr;

    try {

        const parsedUrl = new URL(url);

        let urlPathName = parsedUrl.pathname.replace(replaceStr, '').replaceAll('/', '');
        urlPathName = toCamelCase(urlPathName);

        console.log('urlPathName: ', urlPathName);

        let fileToCreate = siteFileDir + urlPathName + '.js';

        if (parsedUrl.pathname.replace(replaceStr, '').replaceAll('/', '') == '') {
            fileToCreate = `${siteFileDir}index.js`;
        }

        const html = await fetchUrlData(url);

        if (html.success) {

            // load cheerio
            let $ = cheerio.load(html.success);
            $('svg').remove();

            // Html element manipulation
            let images = $('body').find('img');
            let styles = $('body').find('style');
            let scripts = $('body').find('script');
            // let navLinks = $('body').find('nav').find('div').find('ul').find('li').find('a');
            let navLinks = $('body').find('nav').find('ul').find('li').find('a');
            let tagsWithStyle = $('[style]');

            // change url host on all nav links
            navLinks.each((i, el) => {

                let href = $(el).attr('href');
                href = href.trim();
                let newHref = new URL(href);
                // let anchorText = newHref.pathname.replace(replaceStr, '').replaceAll('/', '');
                let anchorText = $(el).text();
                anchorText = capFirst(anchorText);
                if (anchorText.trim() == '') {
                    anchorText = 'Home';
                }
                newHref = newHref.pathname.replace(replaceStr, '').replaceAll('/', '');
                newHref = '/' + toCamelCase(newHref);
                // if (newHref == '/') {
                //     newHref = '/' + 'index';
                // }
                let elementClass = '';
                if ($(el).attr('class')) {
                    elementClass = $(el).attr('class');
                }
                let elementId = '';
                if ($(el).attr('id')) {
                    elementId = $(el).attr('id');
                }
                // $('body').find('nav').find('div').find('ul').find('li').find(`a[href='${href}']`).replaceWith(`<a id= '${elementId}' class='${elementClass}' href='${newHref}'>${anchorText}</a>`);

                $('body').find('nav').find('ul').find('li').find(`a[href='${href}']`).replaceWith(`<a id= '${elementId}' class='${elementClass}' href='${newHref}'>${anchorText}</a>`);
            });

            //replace <img> tags with img, src, width, height and priority
            images.each((i, el) => {
                const imgSrc = $(el).attr('src');
                const tempImgSrc = new URL(imgSrc.trim());
                const newImgSrc = tempImgSrc.pathname.replace(replaceStr, '');

                if ($(el).attr('width')) {
                    let imgWidth = $(el).attr('width');
                    let imgHeight = $(el).attr('height');
                    imgWidth = imgWidth.replace('px', '').replace('rem', '').replace('em', '');
                    imgHeight = imgHeight.replace('px', '').replace('rem', '').replace('em', '');
                    $(`img[src='${imgSrc}']`).replaceWith(`<img src='${newImgSrc}' alt='/' width='${imgWidth}' height='${imgHeight}' priority='false' >`);
                }
                else {
                    $(`img[src='${imgSrc}']`).replaceWith(`<img src='${imgSrc}' alt='/' width='150' height='150' >`);
                }
            });

            // make css style attribute adhere to next.js rules
            tagsWithStyle.each((i, el) => {
                let styleStr = $(el).attr('style');
                if (styleStr.trim() != '') {
                    styleStr = styleAttrToNext(styleStr)
                    // console.log('styleStr: ', styleStr);
                    $(el).attr('style', styleStr);
                }
            });

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
                const tag = $.html(el);
                if (!tag.includes('id=')) {
                    const scriptId = randomStr(10);
                    tag.attr('id', scriptId);
                }

                console.log('tag: ', tag);
                if ($(el).text().trim() != '') {
                    $(el).text('{`' + temp + '`}');
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

            // make all hr tags self closing
            const hrRegEx = /<hr([^>]*)>/g;
            body = body.replaceAll(hrRegEx, '<hr$1 />');

            // make all br tags self closing
            const brRegEx = /<br([^>]*)>/g;
            body = body.replaceAll(brRegEx, '<br$1 />');

            // make sure LiteYouTubeEmbed is of the right case format and is self closing
            body = body.replaceAll('liteyoutubeembed', 'LiteYouTubeEmbed');

            // change <script> to next's <Script>
            body = body.replaceAll('<script', '<Script');
            body = body.replaceAll('</script', '</Script')
            body = body.replaceAll('"{{', '{{');
            body = body.replaceAll('}}"', '}}');

            // change a tags to Link tags
            body = body.replaceAll('<a ', '<Link ');
            body = body.replaceAll('</a>', '</Link>');

            // construct next.js page
            const nextPage = `
                import Image from 'next/image';
                import Script from 'next/script';
                import Link from 'next/link';
                import LiteYouTubeEmbed from "react-lite-youtube-embed"
                import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

                const ${fileToCreate.replace('.js', '').replaceAll(siteFileDir, '')} = () => {
                    return (
                        <>
                            ${body}
                        </>
                    )    
                }
                export default ${urlPathName == '' ? 'index' : urlPathName};
                `

            // save file
            fs.writeFileSync(fileToCreate, nextPage);
            return res.json({ success: 'Page created.', reults: html.success })
        }
        else if (html.error) {
            throw Error(html.error);
        }

    } catch (err) {
        console.log(err.message);
        return res.json({ error: err.message });
    }
    // }, 1000);

    // return res.json({ success: 'Page created.' })

}

export default createPageApi;



export const extractVideoId = (url) => {
    const regExp = /\/embed\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regExp);
    if (match && match[1]) {
        return match[1];
    } else {
        console.error("Invalid YouTube URL");
    }
}