
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
                console.log('count: ', matches.length);

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
                        placeholder="blur"
                        qualtiy={20}
                        priority="false"
                        // className="${classAttr}"
                         />
                    `;


                    // replace image tags
                    matches.map((match, index) => {
                        // console.log({match})
                        if (match.includes(src)) {
                            fileContent = fileContent.replace(match, imageReplaceStr);
                            // console.log({imageReplaceStr})
                        }
                    });

                });

                // console.log({ importStr });
                createDirectoryAndSaveFile(saveLocation + 'imports.txt', importStr);

                createDirectoryAndSaveFile(saveLocation + 'index.js', fileContent);

                return fileContent;

            } catch (error) {
                console.log('customPageWorkAPI error: ', error.message);
            }

        };
        const temp = nextStaticImageSetup(pathDir);


        return res.json({ success: temp });

    } catch (error) {
        console.log('customPageWorkAPI error: ', error.message);
        return res.json({ error: 'customPageWorkAPI error: ' + error.message });
    }
}

export default customPageWorkAPI;