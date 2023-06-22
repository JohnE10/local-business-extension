
import { isAbsoluteUrl } from 'next/dist/shared/lib/utils';
import { createDirectoryAndSaveFile } from './backEndHelpers';



const fs = require('fs');
const path = require('path');

const customPageWorkAPI = async (req, res) => {

    const cheerio = require('cheerio');

    const pathDir = req.query.path;
    console.log({ pathDir });

    try {

        const nextStaticImageSetup = (dir) => {
            try {
                let importStr = '';
                const saveLocation = 'siteFiles/misc/';
                const stripCharactersRegex = /[^a-zA-Z0-9]/g;
                const imageRegex = /<Image([\s\S]*?)\/>/g;

                let fileContent = fs.readFileSync(dir, 'utf8');

                const $ = cheerio.load(fileContent);

                // array of Image elements
                const matches = fileContent.match(imageRegex);
                // console.log('count: ', matches.length);

                // create the list of imports and replace imageg srcs
                const imgs = $('img');
                imgs.each((i, el) => {
                    const src = $(el).attr('src');
                    // console.log({ src });
                    let classAttr = ''
                    if ($(el).attr('classname')) {
                        classAttr = $(el).attr('className');
                    }

                    let scrFileNameNoExtension = path.basename(src, path.extname(src));
                    scrFileNameNoExtension = scrFileNameNoExtension.replaceAll(stripCharactersRegex, '');
                    importStr = importStr + `import ${scrFileNameNoExtension} from '@/public${src}';` + '\n';

                    const imageReplaceStr = `
                        <Image
                        src={${scrFileNameNoExtension}}
                        alt="${scrFileNameNoExtension}"
                        priority="false"
                        sizes="100vw"
                         />
                    `;


                    // replace image tags
                    if (!isAbsoluteUrl(src)) {
                        matches.map((match, index) => {
                            // console.log({match})
                            if (match.includes(src)) {
                                fileContent = fileContent.replace(match, imageReplaceStr);
                                // console.log({imageReplaceStr})
                            }
                        });
                    }


                });

                // console.log({ importStr });
                createDirectoryAndSaveFile(saveLocation + 'imports.txt', importStr);

                createDirectoryAndSaveFile(saveLocation + 'index.js', fileContent);

                return fileContent;

            } catch (error) {
                console.log('customPageWorkAPI error: ', error.message);
            }

        };
        // const temp = nextStaticImageSetup(pathDir);

        const removeImages = (dir) => {

            const path = require('path');

            const saveLocation = 'siteFiles/misc/';
            let fileContent = fs.readFileSync(dir, 'utf8');
            // const $ = cheerio.load(fileContent);

            const imageRegex = /<Image([\s\S]*?)\/>/g;

            fileContent = fileContent.replaceAll(imageRegex, '');

            // save modified file content
            createDirectoryAndSaveFile(saveLocation + 'index.js', fileContent);

            return fileContent;
        };
        // const temp = removeImages(pathDir);

        const removeTags = (file, tag) => {
            const saveLocation = 'siteFiles/misc/';
            let fileContent = fs.readFileSync(file, 'utf8');

            // change capital Script to small script for cheerio purposes
            fileContent = fileContent.replaceAll('Script', 'script');

            const $ = cheerio.load(fileContent);
            $(tag).remove();

            // // put capital Script back
            // fileContent = $.html().replaceAll('script', 'Script');

            // save modified file content
            const fileName = path.basename(file);
            console.log({fileName})
            createDirectoryAndSaveFile(saveLocation + fileName, $.html());
            return $.html();
        };
        // const temp = removeTags(pathDir, 'Script');


        return res.json({ success: temp });

    } catch (error) {
        console.log('customPageWorkAPI error: ', error.message);
        return res.json({ error: 'customPageWorkAPI error: ' + error.message });
    }
}

export default customPageWorkAPI;