
import { fileNameFromUrl, isAbsoluteURL, isValidUrl, randomStr, toCamelCase } from '../../utils/helpers';
import { createDirectoryAndSaveFile, fileOrDirectory } from './backEndHelpers';
import { styleAttrToNext } from '../../utils/helpers';

const fs = require('fs');
const path = require('path');

const createPageApi = async (req, res) => {

    const cheerio = require('cheerio');

    const commentRegEx = /<!--.*?-->/gs;
    const siteFileDir = 'siteFiles/pages/';
    const svgDir = 'siteFiles/svgs/';

    const basePath = req.query.basePath;
    let initialFileToRead = req.query.pagePath;

    // const tempObj = await fileOrDirectory(initialFileToRead);
    // if (tempObj.isDirectory()) {
    //     initialFileToRead = initialFileToRead + '/index.html';
    // }

    let fileToRead = basePath + initialFileToRead;

    let fileToCreate = siteFileDir + initialFileToRead.replace('.html', '.js');
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
            fs.writeFileSync(tempCompName, componentContent);

        };

        const html = fs.readFileSync(fileToRead, { encoding: 'utf8' });

        if (html) {

            // load cheerio
            let $ = cheerio.load(html);
            // $('svg').remove();

            // remove attr srcset from img tags
            $('img').removeAttr('srcset');

            // replace sidebar with Sidebar Component
            $('#sidebar').replaceWith('<Sidebar />');

            // replace footer with Footer component
            $('footer').replaceWith('<Footer />');

            // remove these scripts
            $('script[id="scroll-back-to-top-js"]').remove();
            $('script[id="scroll-back-to-top-js-extra"]').remove();

            // replace scroll to top button
            $('.scroll-back-to-top-wrapper').replaceWith('<BackToTopButton />');



            // Html element manipulation
            const images = $('body').find('img');
            const styles = $('body').find('style');
            const scripts = $('body').find('script');
            const navLinks = $('body').find('nav').find('li').find('a');
            const aTags = $('body').find('a');
            const svgs = $('body').find('svg');
            const paragraphToRemove = $('body').find('p[class="site-title"]');
            const headScripts = $('head').find('script');
            const revSlider = $('body').find('rs-module-wrap[id="rev_slider_1_1_wrapper"]');
            const chevron = $('body').find('i[class="fa fa-2x fa-chevron-up"]');
            const gformForm = $('body').find('div[id*="gform"]');
            const idMain = $('body').find('div[id="main"]');
            const ulTags = $('body').find('ul');

            // // replace header with <Header />. This is site specific, so I removed until needed
            // $('header').remove();   // this is only needed in some sites, in others you may want to leave it out
            // $('#body-core').replaceWith('<Header />');
            // $('#header').remove();

            // // replace header with <Header />. This is site specific, so I removed until needed
            $('nav').replaceWith('<Navbar /');

            // make ul tags have discs
            ulTags.each((i, el) => {
                $(el).attr('class', 'dcsUl');
            });



            // // escape quotes in text
            // $('h1').each((i, el) => {
            //     let temp = $(el).text();
            //     temp = temp.replaceAll(/"/g, '&quot;').replaceAll(/'/g, '&#39;');
            //     $(el).text(temp);
            // });
            // $('p').each((i, el) => {
            //     let temp = $(el).text();
            //     temp = temp.replaceAll(/"/g, '&quot;').replaceAll(/'/g, '&#39;');
            //     $(el).text(temp);
            //   });
            //   $('div').each((i, el) => {
            //     let temp = $(el).text();
            //     temp = temp.replaceAll(/"/g, '&quot;').replaceAll(/'/g, '&#39;');
            //     $(el).text(temp);
            //   });

            //   $('span').each((i, el) => {
            //     let temp = $(el).text();
            //     temp = temp.replaceAll(/"/g, '&quot;').replaceAll(/'/g, '&#39;');
            //     $(el).text(temp);
            //   });

            // remove div tags that contain gform,
            gformForm.each((i, el) => {
                let temp = $.html(el);
                $(el).replaceWith('{/*' + temp + '*/}');
                // console.log($.html());
            })

            // let setREVStartSizeTag = '';

            // headScripts.each((i, el) => {
            //     let temp = $(el).text();
            //     if (temp && temp.includes('setREVStartSize(e)')) {
            //         setREVStartSizeTag = $.html(el);
            //         $(el).remove();
            //         return false;
            //     }
            // });

            // // custom script fix
            // scripts.each((i, el) => {
            //     let temp = $(el).text();
            //     if (temp && temp.includes('setREVStartSize')) {
            //         // console.log('setREVStartSizeTag: ', setREVStartSizeTag);
            //         $(el).replaceWith(setREVStartSizeTag + '\n' + $.html(el));
            //         // console.log('$(el): ', $.html(el));
            //         return false;
            //     }
            // });

            scripts.each((i, el) => {
                let temp = $(el).text();
                if (temp && temp.includes('setREVStartSize')) {
                    $(el).remove
                }
            });



            // replace iframe
            const iframeReplace1 = `
            <div>
                <a href="https://www.google.com/maps?ll=29.997125,-90.061094&z=15&t=m&hl=en-US&gl=US&mapclient=embed&q=3004+Gentilly+Blvd+New+Orleans,+LA+70122" target="_blank">
                    <Image 
                    src="/images/dumasDentistry.png" alt="Dumas Family Dentistry - New Orleans Dentist" 
                    width="307" 
                    height="204" 
                    priority="false" />
                    </a>
                </div>
            `;

            // // use this initially, after that the iframe gets moved to <Header />
            // $('.contact-footer').replaceWith(iframeReplace1);

            const iframeReplace2 = `
           
                <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13821.531378971853!2d-90.06113691628744!3d29.997161587720868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8620a9ae9e20d987%3A0xd489431f8e9537c6!2sDumas%20Family%20Dentistry!5e0!3m2!1sen!2sus!4v1666368945858!5m2!1sen!2sus" target="_blank">
                    <Image 
                    src="/images/dumasDentistry2.png" alt="Dumas Family Dentistry - New Orleans Dentist" 
                    width="597" 
                    height="449" 
                    priority="false" />
                    </a>
               
            `;

            // replace iframe in specific page (this time it's teh contact page)
            const iframeSrc2 = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13821.531378971853!2d-90.06113691628744!3d29.997161587720868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8620a9ae9e20d987%3A0xd489431f8e9537c6!2sDumas%20Family%20Dentistry!5e0!3m2!1sen!2sus!4v1666368945858!5m2!1sen!2sus';
            $(`iframe[src=${iframeSrc2}]`).each((i, el) => {
                $(el).replaceWith(iframeReplace2);
            });

            aTags.each((i, el) => {

                if (!$(el).attr('href')) {
                    $(el).attr('href', '#');
                }

                let temp = $(el).parent();
                temp = $.html(temp);
                if (temp.includes('<li')) {
                    $(el).attr('class', 'dcsLink')
                }
            });

            // fix facebook and instagram icons lining up wrong
            const asideReplace = `
            <aside style="display: flex; flex-direction: column">
            <h3 class="widget-title">Follow Us On…</h3>

            <div style="display: flex">
                <link href="https://www.facebook.com/DumasFamilyDentistryNewOrleans/" target="_blank" rel="noopener"><Image src="/wp-content/uploads/facebook.png" style="padding-right: 5px" width="32" height="32" priority="false" alt="">

                <ink href="https://www.instagram.com/dumasfamilydentistrynola/" target="_blank" rel="noopener"><Image src="/wp-content/uploads/2022/07/instagram.png" style="padding-right: 5px; padding-top: 1px" width="30" height="30" priority="false" alt="">

            </div>
        </aside>
            `;

            // let asideTags = $('body').find('aside');
            // asideTags.each((i, el) => {
            //     if ($(el).text().includes('Follow Us On…')) {
            //         $(el).replaceWith(asideReplace);
            //     }
            // });

            // add padding to id=main
            idMain.each((i, el) => {
                $(el).attr('style', 'paddingTop: 130px');
            });

            // // add padding to id=sidebar
            // idSidebar.each((i, el) => {
            //     $(el).attr('style', 'paddingTop: 130px');
            // });

            // make css style attribute adhere to next.js rules

            const tagsWithStyle = $('[style]');
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
                $(el).replaceWith(`<${svgName}>\n`);
            });

            // modify nav links to work in next.js site
            aTags.each((i, el) => {
                if ($(el).attr('href')) {
                    let temp = $(el).attr('href').trim();
                    temp = temp.replaceAll('../../', '').replaceAll('../', '').replaceAll('./', '');
                    if (!isAbsoluteURL(temp)) {
                        if (temp.includes('.html')) {
                            if (fileNameFromUrl(temp).parentDirectory == '') {
                                $(el).attr('href', '/');
                                // const temp2 = $(el).attr('href');
                                // fileToCreate = fileToCreate + temp2 + 'index.js';
                            }
                            else {
                                const filename = fileNameFromUrl(temp).fileName;
                                if (filename) {
                                    temp = temp.replace(filename, '');
                                    $(el).attr('href', '/' + temp);
                                    // fileToCreate = fileToCreate + temp + 'index.js';
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
                else {
                    $(el).attr('width', '150');
                    $(el).attr('height', '150');
                    $(el).attr('priority', 'false');

                    if (!$(el).attr('alt')) {
                        $(el).attr('alt', '');
                    }

                    if ($(el).attr('loading')) {
                        $(el).removeAttr('loading')
                    }
                }

                // if ($(el).attr('src') == '/wp-content/uploads/2018/02/logo-headline_lrg-5.png') {
                //     $(el).attr('width', '950');
                //     $(el).attr('height', '252');
                // }

                if ($(el).attr('src').includes('logo-headline_lrg-5.png')) {
                    $(el).attr('width', '950');
                    $(el).attr('height', '252');
                    if (!$(el).attr('alt')) {
                        $(el).attr('alt', '');
                    }

                }

                if ($(el).attr('src').includes('facebook.png')) {
                    $(el).attr('width', '32');
                    $(el).attr('height', '32');
                    if (!$(el).attr('alt')) {
                        $(el).attr('alt', '');
                    }
                }

                if ($(el).attr('src').includes('facebook-sml.png')) {
                    $(el).attr('width', '32');
                    $(el).attr('height', '32');
                    if (!$(el).attr('alt')) {
                        $(el).attr('alt', '');
                    }
                }

                if ($(el).attr('src').includes('instagram.png')) {
                    $(el).attr('width', '32');
                    $(el).attr('height', '32');
                    if (!$(el).attr('alt')) {
                        $(el).attr('alt', '');
                    }
                }

                if ($(el).attr('src') == '/images/slide-new-hours.jpg') {
                    $(el).attr('width', '1500');
                    $(el).attr('height', '350');
                    if (!$(el).attr('alt')) {
                        $(el).attr('alt', '');
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
                // else if ($(el).text() != '') {
                //     // temp = temp.replaceAll('\\', '');
                //     $(el).text('{`' + temp + '`}');
                // }
                if (temp != '') {
                    // temp = temp.replaceAll('\\', '');
                    // console.log(temp);
                    $(el).text('{`' + temp + '`}');
                }
            });

            // make script adhere to next.js rules
            scripts.each((i, el) => {
                if (!$(el).attr('id')) {
                    const scriptId = randomStr(10);
                    $(el).attr('id', scriptId)
                }
            });

            scripts.each((i, el) => {
                if ($.html(el).includes('gform')) {
                    let temp = $.html(el);
                    $(el).remove();
                }
                // if ($.html(el).includes('ResponsiveSlides')) {
                //     $(el).remove();
                // }
            });

            // replace image plugin with next/image
            const ImageTag = `
            	<div style="{{textAlign: 'center'}}">
				<Image src="/images/slide-new-hours.jpg" width="1500" height="350" priority="false" alt="" />
			    </div>
            `;

            // revSlider.each((i, el) => {
            //     const temp = $(el).html();
            //     if ($(el).text().trim() != '') {
            //         $(el).text('{`' + temp + '`}');
            //     }
            //     $(el).replaceWith(`{/*` + temp + `*/}` + '\n' + ImageTag);
            // });

            revSlider.each((i, el) => {
                $(el).remove();
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

            // // remove the following paragraph
            // // console.log({'paragraphToRemove.html()': paragraphToRemove.html()});
            // paragraphToRemove.each((i, el) => {
            //     $(el).text('');
            // });

            // remove all link rel=stylesheet tags
            $('link[rel="stylesheet"]').remove();

            // remove all scripts - if you need some scripts, then just comment this out, and all script tags will get processed as usual.
            $('script').remove();


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

            // change  allowfullscreen to next's allowFullScreen
            body = body.replaceAll('allowfullscreen', 'allowFullScreen');

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

            // change <sidebar>...</sidebar> to <Sidebar /> 
            const sidebarRegEx = /<sidebar([^>]*)>/g;
            body = body.replaceAll(sidebarRegEx, '<sidebar$1 />').replaceAll('<sidebar', '<Sidebar').replaceAll('</sidebar>', '');

            // change <footer>...</footer> to <Footer /> 
            const footerRegEx = /<footer([^>]*)>/g;
            body = body.replaceAll(footerRegEx, '<footer$1 />').replaceAll('<footer', '<Footer').replaceAll('</footer>', '');

            // change <backtotopbutton>
            const backToTopRegEx = /<backtotopbutton([^>]*)>/g;
            body = body.replaceAll(backToTopRegEx, '<backtotopbutton$1 />').replaceAll('<backtotopbutton', '<BackToTopButton').replaceAll('</backtotopbutton>', '');


            // change <header>
            const headerRegEx = /<header([^>]*)>/g;
            body = body.replaceAll(headerRegEx, '<header$1 />').replaceAll('<header', '<Header').replaceAll('</header>', '');

            // change <nav>
            const navRegEx = /<nav([^>]*)>/g;
            body = body.replaceAll(navRegEx, '<nav$1 />').replaceAll('<nav', '<Navbar').replaceAll('</nav>', '');

            // remove some unwanted text
            body = body.replace('Welcome to Mid-City Smiles Family Dentistry! We are a dental practice located in New Orleans. Our team specializes in family dentistry and orthodontic care – Diamond Invisalign Providers..', '');

            // misc replace
            body = body.replaceAll(`revslider_showDoubleJqueryError("#rev_slider_1_1");`, `// revslider_showDoubleJqueryError("#rev_slider_1_1");`);
            body = body.replaceAll('<Script type="text/javascript">', '<Script type="text/javascript">{`');
            body = body.replaceAll('};</Script>', '};`}</Script>');
            body = body.replaceAll('<div className="header-social">', `<div style={{display: 'flex', justifyContent: 'flex-end'}}>`);
            body = body.replaceAll('rel=0&amp;wmode=transparent" width="100%" height="200" frameBorder="0"&gt;', '');

            // body = body.replaceAll('<Image src="/wp-content/uploads/2022/07/facebook.png" alt="instagram logo"', `<Image src="/wp-content/uploads/2022/07/facebook.png" alt="instagram logo" style={{ paddingRight: '5px' }}`);
            // body = body.replaceAll('<Image src="/wp-content/uploads/2022/07/facebook-sml.png" alt="instagram logo"', `<Image src="/wp-content/uploads/2022/07/facebook-sml.png" alt="instagram logo" style={{ paddingRight: '5px' }}`);

            // construct next.js page
            const nextPage = `
                import Image from 'next/image';
                import Script from 'next/script';
                import Link from 'next/link';
                import LiteYouTubeEmbed from "react-lite-youtube-embed";
                import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
                import '@/jQueryLoader.js';
                import Sidebar from '@/components/Sidebar';
                import Footer from '@/components/Footer';
                import BackToTopButton from '@/components/BackToTopButton';
                import Header from '@/components/Header';
                
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
            const results = createDirectoryAndSaveFile(fileToCreate, nextPage);
            return res.json({ success: results });
        }
        else if (html.error) {
            throw Error(html.error);
        }

        // return res.json({success: 'temp'});
    } catch (err) {
        console.log({ fileToRead }, { initialFileToRead });
        console.log('createPageApi error: ', err.message);
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