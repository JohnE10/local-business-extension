
import { capFirst, fileNameFromUrl, isAbsoluteURL, isValidUrl, randomStr, toCamelCase } from '../../utils/helpers';
import { createDirectoryAndSaveFile, deleteDirectoryContents, fetchUrlData, fileOrDirectory, listFilesInDirectory } from './backEndHelpers';
import { styleAttrToNext } from '../../utils/helpers';

const fs = require('fs');
const path = require('path');

const createPageApi = async (req, res) => {

    const cheerio = require('cheerio');

    const commentRegEx = /<!--.*?-->/gs;
    const siteFileDir = 'siteFiles/pages/';
    const svgDir = 'siteFiles/svgs/';

    const basePath = req.query.basePath;
    const replaceStr = req.query.replaceStr;
    let fileToRead = req.query.pagePath;

    const tempObj = await fileOrDirectory(fileToRead);
    if (tempObj.isDirectory()) {
        fileToRead = fileToRead + '/index.html';
    }

    let fileToCreate = siteFileDir;
    let fileToCreateArr = [];
    let filesNotCreatedTxt = '';

    const errorLogDir = siteFileDir + '1-errorLog/errorLog.txt';

    try {

        const createSVGComponent = (svg, name) => {
            const componentContent = `
                const ${name} = () => {
                    return (
                        <div>
                            ${svg}
                        </div>
                    )
                }
                
                export default ${name}
            `;
            const tempCompName = svgDir + name + '.js';
            fs.writeFileSync(tempCompName, componentContent, 'utf-8');

        };

        const html = fs.readFileSync(fileToRead, { encoding: 'utf8' });

        if (html) {

            // load cheerio
            let $ = cheerio.load(html);

            // remove attr srcset from img tags
            $('img').removeAttr('srcset');

            // Html element manipulation
            let images = $('body').find('img');
            let styles = $('body').find('style');
            let scripts = $('body').find('script');
            let navLinks = $('body').find('nav').find('li').find('a');
            let tagsWithStyle = $('[style]');
            let aTags = $('body').find('a');
            let svgs = $('body').find('svg');
            const paragraphToRemove = $('body').find('p[class="site-title"]');
            let headScripts = $('head').find('script');
            let revSlider = $('body').find('rs-module-wrap[id="rev_slider_1_1_wrapper"]');

            let setREVStartSizeTag = '';

            headScripts.each((i, el) => {
                let temp = $(el).text();
                if (temp && temp.includes('setREVStartSize(e)')) {
                    setREVStartSizeTag = $.html(el);
                    return false;
                }
            });

            scripts.each((i, el) => {
                let temp = $(el).text();
                if (temp && temp.includes('setREVStartSize')) {
                    $(el).replaceWith(setREVStartSizeTag + '\n' + $.html(el));
                    return false;
                }
            });

            aTags.each((i, el) => {
                // console.log($(el).attr('href'));
                if (!$(el).attr('href')) {
                    $(el).attr('href', '#');
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

            // handle svgs
            let svgImports = '';
            svgs.each((i, el) => {
                const svgName = `Svg${i + 1}`;
                let svgContent = $.html(el);
                svgContent = svgContent.replaceAll('xlink:href', 'href');
                svgContent = svgContent.replaceAll('xmlns:xlink', 'xmlns');
                svgContent = svgContent.replaceAll('"{{', '{{');
                svgContent = svgContent.replaceAll('}}"', '}}');
                svgContent = svgContent.replaceAll('color-interpolation-filters', 'colorInterpolationFilters');
                svgContent = svgContent.replaceAll('xml:space', 'xmlSpace');
                svgContent = svgContent.replaceAll('stroke-width', 'strokeWidth');
                createSVGComponent(svgContent, svgName);
                svgImports = svgImports + `import ${svgName} from '../../components/${svgName}';\n`;
                // fs.appendFileSync('components/svgImports.txt', `import ${svgName} from '../../components/${svgName}';\n`);
                // // svgImports.push(`import ${svgName} from '../../components/${svgName}`);
                $(el).replaceWith(`<${svgName}>\n`);
            });

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


            // // modify a tag hrefs to .js from .html
            // aTags.each((i, el) => {
            //     if ($(el).attr('href')) {
            //         let temp = $(el).attr('href').trim();
            //         if (!isAbsoluteURL(temp)) {
            //             if (temp.includes('.html')) {
            //                 if (fileNameFromUrl(temp).parentDirectory == '') {
            //                     $(el).attr('href', '/');
            //                 }
            //                 else {
            //                     const filename = fileNameFromUrl(temp).fileName;
            //                     temp = temp.replace(filename, '');
            //                     $(el).attr('href', temp);
            //                 }
            //             }

            //         }
            //     }
            // });


            aTags.each((i, el) => {
                if ($(el).attr('href')) {
                    let temp = $(el).attr('href').trim();
                    if (!isAbsoluteURL(temp)) {
                        if (temp.includes('.html')) {
                            if (fileNameFromUrl(temp).parentDirectory == '') {
                                $(el).attr('href', '/');
                                const temp2 = $(el).attr('href');
                                fileToCreate = fileToCreate + temp2 + 'index.js';   
                            }
                            else {
                                const filename = fileNameFromUrl(temp).fileName;
                                if (filename) {
                                    temp = temp.replace(filename, '');
                                    $(el).attr('href', temp);
                                    fileToCreate = fileToCreate + temp + 'index.js';
                                    fileToCreateArr.push(fileToCreate);
                                }
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
                    $(el).attr('alt', '');
                    if ($(el).attr('loading')) {
                        $(el).removeAttr('loading')
                    }
                }
                else if ($(el).attr('src') == '/wp-content/uploads/2018/02/logo-headline_lrg-5.png') {
                    $(el).attr('width', '950');
                    $(el).attr('height', '252');
                }
                else if ($(el).attr('src') == '/wp-content/uploads/2022/07/facebook.png') {
                    $(el).attr('width', '32');
                    $(el).attr('height', '32');
                }
                else if ($(el).attr('src') == '/wp-content/uploads/2022/07/facebook-sml.png') {
                    $(el).attr('width', '32');
                    $(el).attr('height', '32');
                }
                else if ($(el).attr('src') == '/images/slide-new-hours.jpg') {
                    $(el).attr('width', '1500');
                    $(el).attr('height', '350');
                }
                else {
                    $(el).attr('width', '150');
                    $(el).attr('height', '150');
                    $(el).attr('priority', 'false');
                    if ($(el).attr('loading')) {
                        $(el).removeAttr('loading')
                    }
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
                else if ($(el).text().trim() != '') {
                    // temp = temp.replaceAll('\\', '');
                    $(el).text('{`' + temp + '`}');
                }
            });

            // make script adhere to next.js rules
            scripts.each((i, el) => {
                const temp = $(el).text();
                const tag = $.html(el);
                if (tag) {
                    if (!tag.includes('id=')) {
                        const scriptId = randomStr(10);
                        if (tag.attr) {
                            tag.attr('id', scriptId);
                        }

                    }
                }

            });

            // replace image plugin with next/image
            const ImageTag = `
            	<div style={{ textAlign: 'center' }}>
				<Image src="/images/slide-new-hours.jpg" width="1500" height="350" priority="false" alt="" />
			    </div>
            `;

            revSlider.each((i, el) => {
                const temp = $(el).html();
                if ($(el).text().trim() != '') {
                    $(el).text('{`' + temp + '`}');
                }
                $(el).html() = `{/*` + temp + `*/}` + '\n' + ImageTag;
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

            // add section closing tags
            const sectionTags = $('section')
            sectionTags.each((i, el) => {
                const temp = $.html(el);
            });

            // remove the following paragraph
            // console.log({'paragraphToRemove.html()': paragraphToRemove.html()});
            paragraphToRemove.each((i, el) => {
                $(el).text('');
            });

            // remove all link rel=stylesheet tags
            $('link[rel="stylesheet"]').remove();


            //Set body to the newly modified html
            let body = $('body').html();

            // make all link tags self closing
            const linkRegEx = /<link([^>]*)>/g;
            body = body.replaceAll(linkRegEx, '<link$1 />');

            // make all input tags self closing
            const inputRegEx = /<input([^>]*)>/g;
            body = body.replaceAll(inputRegEx, '<input$1 />');

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

            // remove all svg closing tags
            const svgClosingRegex = /<\/svg[^>]*>/gi;
            body = body.replaceAll(svgClosingRegex, '');

            // make all svg tags self closing
            const svgRegEx = /<svg([^>]*)>/g;
            body = body.replaceAll(svgRegEx, '<svg$1 />');

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

            // change  charset to next's charSet
            body = body.replaceAll('charset', 'charSet');

            // change  http-equiv to next's httpEquiv
            body = body.replaceAll('http-equiv', 'httpEquiv');



            // change a tags to Link tags
            body = body.replaceAll('<a ', '<Link ');
            body = body.replaceAll('</a>', '</Link>');

            // replace ../ and ../../ with /
            body = body.replaceAll('="../../', '="/');
            body = body.replaceAll('="../', '="/');

            // replace srcset with srcSet and crossorigin with crossOrigin and some others
            body = body.replaceAll('srcset', 'srcSet');
            body = body.replaceAll('crossorigin', 'crossOrigin');
            body = body.replaceAll('frameborder', 'frameBorder');

            // add closing section closing tag
            const sectionRegex = /<section\b[^>]*>([\s\S]*?)<\/section>?/g;
            body = body.replaceAll(sectionRegex, '<section>$1</section>');


            // replace svg tags with Svg
            body = body.replaceAll('<svg', '<Svg');

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
                ${svgImports}

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
        console.log('createPageApi error: ', err);
        return res.json({ error: err.message });
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