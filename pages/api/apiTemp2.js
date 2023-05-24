import { fileTree } from '../../utils/helpers';
import { chooseDirectory, createDirectory, createDirectoryAndSaveFile, fileOrDirectory, listFilesInDirectory } from './backEndHelpers';

const ApiTemp2 = async (req, res) => {

	const fs = require('fs');
	const path = require('path');

// const dirPath = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/HTTrack_mid-city-smiles/mid-city-smiles/www.midcitysmiles.com/blog/wp-content/plugins/social-icons-widget-by-wpzoom/assets/css/wpzoom-social-icons-stylesd697.css?ver=1679942358';

const dirPath = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/HTTrack_mid-city-smiles/mid-city-smiles/www.midcitysmiles.com/blog/wp-content/plugins/social-icons-widget-by-wpzoom/assets/css/wpzoom-social-icons-stylesd697.css';

const results = fs.readFileSync(dirPath, {encoding: 'utf-8'});

console.log({results});

	return res.json(results);

};

export default ApiTemp2;
