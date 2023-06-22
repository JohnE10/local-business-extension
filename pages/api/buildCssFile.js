
import { fileNameFromUrl } from '../../utils/helpers';
import { copyFile, createDirectoryAndSaveFile, searchForFile } from './backEndHelpers';

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');


const buildCssFile = async (req, res) => {

    try {

        const cssUrlsNotFoundList = 'siteFiles/css/cssUrlsNotFoundList.txt';


        // heler functions
        // const appendToCssFile = async (relativeUrl, fileName) => {


        //     let importText = '';
        //     let importUrl = '';
        //     let cssUrlsToMove = '';


        //     importUrl = fileNameFromUrl(relativeUrl).fileName;
        //     importText = `import '@/styles/${importUrl}';`;

        //     // copy pertinent css files to styles directory
        //     const relativeUrlList = cssFileName.replace('.css', '.txt');
        //     const destinationFile = 'siteFiles/css/moveToStyles/' + importUrl;

        //     const cssUrlsDestinationFile = 'siteFiles/css/moveToPublic/' + cssUrlsFileName;


        //     if (fs.existsSync(relativeUrl)) {
        //         copyFile(relativeUrl, destinationFile);
        //         fs.appendFileSync(cssFileName, importText + '\n');
        //         fs.appendFileSync(relativeUrlList, relativeUrl + '\n');
        //     }
        //     else {
        //         fs.appendFileSync(fileDoesNotExist, importUrl + '\n');
        //     }

        // };

        const appendToCssFile = async (relativeUrl, fileName, fileContent) => {


            let importText = '';
            let importUrl = '';
            let cssUrlsToMove = '';


            importUrl = fileNameFromUrl(relativeUrl).fileName;
            importText = `import '@/styles/${importUrl}';`;

            // copy pertinent css files to styles directory
            const relativeUrlList = cssFileName.replace('.css', '.txt');
            const destinationFile = 'siteFiles/css/moveToStyles/' + importUrl;

            const cssUrlsDestinationFile = 'siteFiles/css/moveToPublic/' + cssUrlsFileName;


            if (fs.existsSync(relativeUrl)) {
                // copyFile(relativeUrl, destinationFile);
                // fs.writeFile(destinationFile, fileContent);
                fs.appendFileSync(cssFileName, importText + '\n');
                fs.appendFileSync(relativeUrlList, relativeUrl + '\n');
            }
            else {
                fs.appendFileSync(fileDoesNotExist, importUrl + '\n');
            }

        };



        const appendToCssUrlImports = async (x, y) => {

            let cssFileContent = fs.readFileSync(x, 'utf8');
            const cssUrlRegex = /url\(['"]?([^'"\(\)]+)['"]?\)/g;
            const matches = cssFileContent.match(cssUrlRegex);
            

            if (matches) {
                const urls = matches.map(match => match.slice(4, -1));
                // console.log({urls});

                urls.map((ele) => {
                    ele = ele.replaceAll('"', '').replaceAll(`'`, '');
                    // console.log({ ele });
                    let fileToCopyFull = path.basename(ele);
                    let fileToCopy = path.basename(ele.split('?')[0]);
                    fileToCopy = fileToCopy.split('#')[0]
                    console.log({fileToCopy});
                    let foundFilePath = searchForFile(searchPath, fileToCopy);
                    if (foundFilePath) {
                        foundFilePath = foundFilePath.replace(searchPath, '/').replaceAll('\\', '/').replaceAll(fileToCopy, fileToCopyFull);
                        cssFileContent = cssFileContent.replaceAll(ele, foundFilePath);
                        console.log(`File found at: ${foundFilePath}`);
                    } else {
                        
                        fs.appendFileSync(cssUrlsNotFoundList, x + ': ' + ele + "\n");

                    }
                });

            }
            const cssFileBaseName = path.basename(x);
            const destFile = 'siteFiles/css/modifiedCssFiles/' + cssFileBaseName;
            createDirectoryAndSaveFile(destFile, cssFileContent);
        };

        const searchPath = 'C:\\Users\\jetto\\OneDrive\\Desktop\\Files\\Coding-ASUS\\WP Migration Campaign\\uptownsmiles\\public\\';

        let cssFilePath = req.query.cssFilePath;
        const basePath = req.query.basePath;
        const cssUrlsFileName = req.query.cssUrlsFileName;

        console.log({ basePath });
        const cssFileName = req.query.cssFileName;

        const relativeUrlList = cssFileName.replace('.css', '.txt');
        const fileDoesNotExist = 'siteFiles/css/fileNotExist.txt';

        const additionalCss = ``;

        fs.writeFileSync(cssFileName, additionalCss);
        fs.writeFileSync(relativeUrlList, 'List of imported stylesheets \n \n');
        fs.writeFileSync(fileDoesNotExist, 'List of non-existant files \n \n');

        // const appendToCssFile = async (relativeUrl, fileName) => {


        //     let importText = '';
        //     let importUrl = '';
        //     let cssUrlsToMove = '';


        //     importUrl = fileNameFromUrl(relativeUrl).fileName;
        //     importText = `import '@/styles/${importUrl}';`;

        //     // copy pertinent css files to styles directory
        //     const relativeUrlList = cssFileName.replace('.css', '.txt');
        //     const destinationFile = 'siteFiles/css/moveToStyles/' + importUrl;

        //     const cssUrlsDestinationFile = 'siteFiles/css/moveToPublic/' + cssUrlsFileName;


        //     if (fs.existsSync(relativeUrl)) {
        //         copyFile(relativeUrl, destinationFile);
        //         fs.appendFileSync(cssFileName, importText + '\n');
        //         fs.appendFileSync(relativeUrlList, relativeUrl + '\n');
        //     }
        //     else {
        //         fs.appendFileSync(fileDoesNotExist, importUrl + '\n');
        //     }

        // };

        // const appendToCssUrlImports = async (x, y) => {
        //     let cssFileContent = fs.readFileSync(x, 'utf8');
        //     const cssUrlRegex = /url\(['"]?([^'"\(\)]+)['"]?\)/g;
        //     const matches = cssFileContent.match(cssUrlRegex);
        //     if (matches) {
        //         const urls = matches.map(match => match.slice(4, -1));
        //         // console.log({urls});

        //         urls.map((ele) => {
        //             ele = ele.replaceAll('"', '').replaceAll(`'`, '');
        //             console.log({ ele });
        //             const fileToCopy = path.basename(ele);
        //             // console.log({fileToCopy});
        //             let foundFilePath = searchForFile(searchPath, fileToCopy);
        //             if (foundFilePath) {
        //                 foundFilePath = foundFilePath.replace(searchPath, '/').replaceAll('\\', '/')
        //                 cssFileContent = cssFileContent.replaceAll(ele, foundFilePath);
        //                 console.log(`File found at: ${foundFilePath}`);
        //             } else {
        //                 console.log(`File not found: ${fileToCopy}`);
        //             }
        //         });

        //     }
        // };

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
                    appendToCssUrlImports(temp, cssUrlsFileName);
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



