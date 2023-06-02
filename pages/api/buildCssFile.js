import { fileNameFromUrl } from '../../utils/helpers';
import { copyFile } from './backEndHelpers';

const fs = require('fs');
const cheerio = require('cheerio');

const postcss = require('postcss');
const cssnano = require('cssnano');


const buildCssFile = async (req, res) => {

    try {

        let cssFilePath = req.query.cssFilePath;
        const basePath = req.query.basePath;
        console.log({ basePath });
        const cssFileName = req.query.cssFileName;

        const relativeUrlList = cssFileName.replace('.css', '.txt');
        const fileDoesNotExist = 'siteFiles/css/fileNotExist.txt';

        const additionalCss = ``;

        fs.writeFileSync(cssFileName, additionalCss);
        fs.writeFileSync(relativeUrlList, 'List of imported stylesheets \n \n');
        fs.writeFileSync(fileDoesNotExist, 'List of non-existant files \n \n');

        // const appendToCssFile = async (relativeUrl, fileName) => {

        //     console.log({ relativeUrl });
        //     console.log({ fileName });

        //     // // Read the CSS file
        //     // const css = fs.readFileSync(relativeUrl, 'utf8');

        //     // // Parse the CSS using postcss
        //     // const parsedCss = await postcss().process(css, { from: relativeUrl });

        //     // // Apply cssnano to minify the CSS
        //     // const minifiedCss = await cssnano.process(parsedCss.css);

        //     // let data = minifiedCss.css;

        //     // read file
        //     let data = fs.readFileSync(relativeUrl, { encoding: 'utf-8' });

        //     // remove all instances of @charset
        //     // const removeCharset = data.replace(/@charset[^;]+;/g, (match) => `/* ${match} */`);
        //     data = data.replace(/@charset[^;]+;/g, (match) => `/* ${match} */`);

        //     // replace '../' with '/'
        //     data = data.replaceAll('../', '/');

        //     // replace all instances of -webkit-backface-visibility: hidden; with backface-visibility: hidden;
        //     data = data.replaceAll('-webkit-backface-visibility: hidden;', 'backface-visibility: hidden;');

        //     // replace all instances of  '-webkit-appearance: textfield; with appearance: textfield;
        //     data = data.replaceAll('-webkit-appearance: textfield;', 'appearance: textfield;');

        //     // more replacing
        //     data = data.replaceAll('-webkit-appearance: button;', 'appearance: button;');

        //     // data = data.replaceAll('speak: none;', '');
        //     data = data.replaceAll(/speak[^;]+;/g, '');
        //     data = data.replace(/-ms-filter[^;]+;/g, '');

        //     // add semicolon to last value in selector
        //     data = data.replaceAll('}', ';}');
        //     data = data.replaceAll(';;', ';');
        //     data = data.replaceAll('};}', '}}');

        //     // stylesheet location file
        //     const relativeUrlList = cssFileName.replace('.css', '.txt');
        //     fs.appendFileSync(cssFileName, data);
        //     const trimmedRelativeUrl = fileNameFromUrl(relativeUrl).fileName;
        //     fs.appendFileSync(relativeUrlList, trimmedRelativeUrl + '\n');

        // };

        const appendToCssFile = async (relativeUrl, fileName) => {

            // console.log({ relativeUrl });
            // console.log({ fileName });

            let importText = '';
            let importUrl = '';
            

            importUrl = fileNameFromUrl(relativeUrl).fileName;
            importText = `import '@/styles/${importUrl}';`;
            
            // copy pertinent css files to styles directory
            const relativeUrlList = cssFileName.replace('.css', '.txt');
            const destinationFile = 'siteFiles/css/moveToStyles/' + importUrl;
           
            
            if (fs.existsSync(relativeUrl)) {
                copyFile(relativeUrl, destinationFile);
                fs.appendFileSync(cssFileName, importText + '\n');
                fs.appendFileSync(relativeUrlList, relativeUrl + '\n');
              }
              else {
                fs.appendFileSync(fileDoesNotExist, importUrl + '\n');
              }



        };

        const fileToRead = req.query.cssFilePath;
        // console.log('fileToRead: ', fileToRead);

        if (fileToRead) {

            // console.log('inside fileToRead');

            const html = fs.readFileSync(fileToRead, { encoding: 'utf-8' });
            // console.log({html});

            const $ = cheerio.load(html);

            $('link[rel="stylesheet"]').map((i, ele) => {
                let temp = $(ele).attr('href');
                // console.log({ temp });

                if ($(ele).attr('href').includes('.css')) {

                    temp = temp.replaceAll('../../', basePath);
                    temp = temp.replaceAll('../', basePath);

                    if (!temp.includes(basePath)) {
                        if (basePath.charAt(basePath.length - 1) == '/') {
                            temp = basePath + temp;
                        }
                        else {
                            temp = basePath + '/' + temp;
                        }

                    }

                    let tempFileName = fileNameFromUrl(temp).fileName;

                    if (tempFileName.includes('?ver')) {
                        let temp2 = tempFileName.split('?');
                        let version = temp2[temp2.length - 1];
                        // console.log({ version });
                        temp = temp.replaceAll('?' + version, '');
                        // console.log({ temp });
                    }

                    appendToCssFile(temp, cssFileName);
                    console.log('Done');
                }
            });


        }
        else {
            console.log('no fileToRead');
        }

        return res.status(200).json({ success: 'Done' });

    } catch (err) {
        console.log(err);
        return res.status(200).json({ error: err.message });
    }

}

export default buildCssFile;



