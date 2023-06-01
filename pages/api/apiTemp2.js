import { split } from 'postcss/lib/list';
import { fileTree, isAbsoluteURL } from '../../utils/helpers';
import { chooseDirectory, copyFile, createDirectory, createDirectoryAndSaveFile, deleteDirectoryContents, fileOrDirectory, listFilesInDirectory } from './backEndHelpers';




const ApiTemp2 = async (req, res) => {

	const fs = require('fs');
	const path = require('path');

	const filePath = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/HTtrack/HTTrack_dumasfamilydentistry/dumasfamilydentistry/dumasfamilydentistry/index.html';

	// const sourceFile = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/js/react/local-business-extension/siteFiles/temp/stylesheets.css';

	const destinationFile = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/js/react/local-business-extension/siteFiles/css/stylesheets.css';

	const sourceFile = 'siteFiles/css/classic-themes.minae48.css';

		const temp = fs.readFileSync(sourceFile, 'utf-8');

	return res.json(temp);
	
};

export default ApiTemp2;
