import { fileNameFromUrl } from '../../utils/helpers';
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

                let fileContent = fs.readFileSync(dir, 'utf8');
    
                const $ = cheerio.load(fileContent);
    
                // create the list of imports
                const imgs = $('img');
                imgs.each((i, el) => {
                    const src = $(el).attr('src');
                    let scrFileNameNoExtension = path.basename(src, path.extname(src));
                    scrFileNameNoExtension = scrFileNameNoExtension.replaceAll(stripCharactersRegex, '');
                    importStr = importStr + `import ${scrFileNameNoExtension} from '@/public${src}';` + '\n';
                    
                });
                console.log({importStr});
                createDirectoryAndSaveFile(saveLocation + 'imports.txt', importStr);

                
       
            } catch (error) {
                console.log('customPageWorkAPI error: ', error.message);
            }

        };
        nextStaticImageSetup(pathDir);

        return res.json({ success: 'Done' });

    } catch (error) {
        console.log('customPageWorkAPI error: ', error.message);
        return res.json({error: 'customPageWorkAPI error: ' + error.message});
    }
}

export default customPageWorkAPI;