import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import { capFirst, fileNameFromUrl, isAbsoluteURL, isValidUrl, randomStr, toCamelCase } from '../../utils/helpers';
import { createDirectoryAndSaveFile, fetchUrlData, fileOrDirectory, listFilesInDirectory } from './backEndHelpers';
import { styleAttrToNext } from '../../utils/helpers';


const fs = require('fs');
const path = require('path');

const createPageApi = async (req, res) => {

    const cheerio = require('cheerio');

    const commentRegEx = /<!--.*?-->/gs;
    const siteFileDir = 'siteFiles/';



    try {

        // let fileToCreate = req.query.pagePath;
        let fileToRead = req.query.pagePath;

        const tempObj = await fileOrDirectory(fileToRead);
        if (tempObj.isDirectory()) {
            fileToRead = fileToRead + '/index.html';
        }

        const basePath = req.query.basePath;
        const replaceStr = req.query.replaceStr;
        // const fileToRead = 'siteFiles/pagesToBuild/orthodontics/index.html';
        console.log({ fileToRead });
        // const replaceStr = req.query.replaceStr;


        // let fileToCreate = 'orthodontics';
        // fileToCreate = siteFileDir + toCamelCase(fileToCreate) + '.js';
        let fileToCreate = siteFileDir + fileToRead.replace(basePath, '').replace('.html', '') + '.js';

        console.log({ fileToCreate });

        const html = fs.readFileSync(fileToRead, { encoding: 'utf8' });

        if (html) {

            // load cheerio
            let $ = cheerio.load(html);
            $('svg').remove();

            // Html element manipulation
            let images = $('body').find('img');
            let styles = $('body').find('style');
            let scripts = $('body').find('script');
            let navLinks = $('body').find('nav').find('li').find('a');
            let tagsWithStyle = $('[style]');
            let aTags = $('body').find('a');
            const paragraphToRemove = $('body').find('p[class="site-title"]');

            // // modify nav links to work in next.js site
            // navLinks.each((i, el) => {
            //     if ($(el).attr('href')) {
            //         let temp = $(el).attr('href').trim();
            //         if (temp.includes('/')) {
            //             temp = fileNameFromUrl(temp);
            //             let temp1 = temp.fileName;
            //             if (temp1.includes('.html')) {
            //                 temp1 = temp1.replace('.html', '.js');
            //             }
            //             let temp2 = temp.parentDirectory;
            //             temp2 = temp2.replaceAll('.', '').trim();
            //             console.log({ temp1 });
            //             console.log({ temp2 });
            //             if (temp2 == '') {
            //                 $(el).attr('href', '/');
            //             }
            //             else {
            //                 temp2 = toCamelCase(temp2);
            //                 $(el).attr('href', '/' + temp2 + '/');
            //             }
            //         }
            //         else {
            //             if ($(el).attr('href') == 'index.html') {
            //                 $(el).attr('href', '');
            //             }

            //         }
            //     }
            // });


            // modify a tag hrefs to .js from .html
            aTags.each((i, el) => {
                if ($(el).attr('href')) {
                    let temp = $(el).attr('href').trim();
                    if (!isAbsoluteURL(temp)) {
                        if (temp.includes('.html')) {
                            if (fileNameFromUrl(temp).parentDirectory == '') {
                                $(el).attr('href', '/');
                            }
                            else {
                                const filename = fileNameFromUrl(temp).fileName;
                                temp = temp.replace(filename, '');
                                $(el).attr('href', temp);
                            }
                        }

                    }
                }
            });

            //replace <img> tags with img, src, width, height and priority
            images.each((i, el) => {
                const imgSrc = $(el).attr('src');
                if ($(el).attr('width') && $(el).attr('height')) {
                    let imgWidth = $(el).attr('width');
                    let imgHeight = $(el).attr('height');
                    imgWidth = imgWidth.replace('px', '').replace('rem', '').replace('em', '');
                    imgHeight = imgHeight.replace('px', '').replace('rem', '').replace('em', '');
                    $(el).attr('width', imgWidth);
                    $(el).attr('height', imgHeight);
                    $(el).attr('priority', 'false');
                    if($(el).attr('loading')) {
                        $(el).removeAttr('loading')
                    }
                }
                else {
                    $(el).attr('width', '150');
                    $(el).attr('height', '150');
                    $(el).attr('priority', 'false');
                    if($(el).attr('loading')) {
                        $(el).removeAttr('loading')
                    }
                }
            });

            // make css style attribute adhere to next.js rules
            tagsWithStyle.each((i, el) => {
                let styleStr = $(el).attr('style');
                if (styleStr.trim() != '') {
                    styleStr = styleAttrToNext(styleStr);
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

            // make script tags adhere to next.js rules
            scripts.each((i, el) => {
                let temp = $(el).text();
                // console.log({ temp })
                if ($(el).attr('id') == 'twentyseventeen-skip-link-focus-fix-js-extra') {
                    const temp2 = `
                        var twentyseventeenScreenReaderText = {
                        quote: '<svg className="icon icon-quote-right" aria-hidden="true" role="img"><use href="#icon-quote-right" xlink:href="#icon-quote-right"></use></svg>',
                        expand: 'Expand child menu',
                        collapse: 'Collapse child menu',
                        icon: '<svg clasName="icon icon-angle-down" aria-hidden="true" role="img"><use href="#icon-angle-down" xlink:href="#icon-angle-down"></use><span class="svg-fallback icon-angle-down"></span></svg>'
                    };
                    `
                    $(el).text('{`' + temp2 + '`}');
                }
                // else if ($(el).text().trim() != '') {
                //     temp = temp.replaceAll('\\', '');
                //     $(el).text('{`' + temp + '`}');
                // }
            });

            // make script adhere to next.js rules
            scripts.each((i, el) => {
                const temp = $(el).text();
                const tag = $.html(el);
                if (!tag.includes('id=')) {
                    const scriptId = randomStr(10);
                    tag.attr('id', scriptId);
                }
            });

            // if YT video, use Next Video Compnent
            if (html.includes('youtube.com')) {
                if ($('body').find('iframe')) {
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
            }

            // remove the following paragraph
            // console.log({'paragraphToRemove.html()': paragraphToRemove.html()});
            paragraphToRemove.each((i, el) => {
                $(el).text('');
            });

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

            // replace ../ and ../../ with /
            body = body.replaceAll('="../../', '="/');
            body = body.replaceAll('="../', '="/');

            // replace srcset with srcSet and crossorigin with crossOrigin
            body = body.replaceAll('srcset', 'srcSet');
            body = body.replaceAll('crossorigin', 'crossOrigin');

            // replace ='wp with ='/wp
            body = body.replaceAll('src="wp', 'src="/wp');

            // remove some unwanted text
            body = body.replace('Welcome to Mid-City Smiles Family Dentistry! We are a dental practice located in New Orleans. Our team specializes in family dentistry and orthodontic care – Diamond Invisalign Providers..', '');

            // construct next.js page
            const nextPage = `
                import Image from 'next/image';
                import Script from 'next/script';
                import Link from 'next/link';
                import LiteYouTubeEmbed from "react-lite-youtube-embed";
                import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
                import '../../jQueryLoader.js';

                const index = () => {
                    return (
                        <>
                            ${body}
                        </>
                    )    
                }
                export default index;
            `;

            // save file
            // fs.writeFileSync(fileToCreate, nextPage);
            const results = createDirectoryAndSaveFile(fileToCreate, nextPage);
            return res.json({ success: results });

        }
        else if (html.error) {
            throw Error(html.error);
        }

    } catch (err) {
        console.log(err.message);
        return res.json({ 'catch error ': err.message });
    }

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