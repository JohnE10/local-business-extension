import { fileNameFromUrl } from '../../utils/helpers';

const fs = require('fs');
const cheerio = require('cheerio');


const buildCssFile = async (req, res) => {

    try {

        let cssFilePath = req.query.cssFilePath;
        const basePath = req.query.basePath;
        console.log({ basePath });
        const cssFileName = req.query.cssFileName;

        fs.writeFileSync(cssFileName, '');

        const appendToCssFile = async (relativeUrl, fileName) => {

            console.log({ relativeUrl });
            console.log({ fileName });

            // read file
            let data = fs.readFileSync(relativeUrl, { encoding: 'utf-8' });

            // remove all instances of @charset
            // const removeCharset = data.replace(/@charset[^;]+;/g, (match) => `/* ${match} */`);
            data = data.replace(/@charset[^;]+;/g, (match) => `/* ${match} */`);

            // replace all instances of -webkit-backface-visibility: hidden; with backface-visibility: hidden;
            data = data.replaceAll('-webkit-backface-visibility: hidden;', 'backface-visibility: hidden;');

            // replace all instances of  '-webkit-appearance: textfield; with appearance: textfield;
            data = data.replaceAll('-webkit-appearance: textfield;', 'appearance: textfield;');

            // more replacing
            data = data.replaceAll('-webkit-appearance: button;', 'appearance: button;');

            // data = data.replaceAll('speak: none;', '');
            data = data.replaceAll(/speak[^;]+;/g, '');
            data = data.replace(/-ms-filter[^;]+;/g, '');

            fs.appendFileSync(cssFileName, data);

        };

        const fileToRead = req.query.cssFilePath;
        console.log('fileToRead: ', fileToRead);

        if (fileToRead) {

            console.log('inside fileToRead');

            const html = fs.readFileSync(fileToRead, { encoding: 'utf-8' });
            // console.log({html});

            const $ = cheerio.load(html);

            $('link[rel="stylesheet"]').map((i, ele) => {
                let temp = $(ele).attr('href');

                if ($(ele).attr('href').includes('.css')) {

                    temp = temp.replaceAll('../../', basePath);
                    temp = temp.replaceAll('../', basePath);

                    let tempFileName = fileNameFromUrl(temp).fileName;
                    // console.log({ tempFileName });

                    if (tempFileName.includes('?ver')) {
                        let temp2 = tempFileName.split('?');
                        let version = temp2[temp2.length - 1];
                        console.log({ version });
                        temp = temp.replaceAll('?' + version, '');
                        console.log({ temp });
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



