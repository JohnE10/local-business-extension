import { split } from 'postcss/lib/list';
import { fileTree, isAbsoluteURL } from '../../utils/helpers';
import { checkLink, chooseDirectory, copyFile, createDirectory, createDirectoryAndSaveFile, deleteDirectoryContents, fileOrDirectory, listFilesInDirectory } from './backEndHelpers';




const ApiTemp2 = async (req, res) => {

	const fs = require('fs');
	const path = require('path');

	// const filePath = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/HTtrack/HTTrack_dumasfamilydentistry/dumasfamilydentistry/dumasfamilydentistry/wp-content/themes/minamaze/lib/extentions/prettyPhoto/css/prettyPhotoc6bd.css?ver=3.1.5';

	// const fileContent = fs.readFileSync(filePath, 'utf-8');

	const link = 'http://googleeeeermksuprafe.com/';

	const results = checkLink(link);

	return res.json(results);
	
};

export default ApiTemp2;
