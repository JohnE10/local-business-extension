import { split } from 'postcss/lib/list';
import { fileTree, isAbsoluteURL } from '../../utils/helpers';
import { chooseDirectory, createDirectory, createDirectoryAndSaveFile, deleteDirectoryContents, fileOrDirectory, listFilesInDirectory } from './backEndHelpers';

const ApiTemp2 = async (req, res) => {

	const fs = require('fs');
	const path = require('path');
  
	const filePath = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/HTtrack/HTTrack_dumasfamilydentistry/dumasfamilydentistry/dumasfamilydentistry/index.html';

	const fileContent = 'Temp text';

	const html = fs.readFileSync(filePath, { encoding: 'utf8' });

	if (html) {
		// load cheerio
		let $ = cheerio.load(html);

		let aTags = $('body').find('a');

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
					
	}




	const temp = isAbsoluteURL(filePath);

	return res.json(temp);

};

export default ApiTemp2;
