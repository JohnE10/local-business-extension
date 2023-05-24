import { fileTree } from '../../utils/helpers';
import { chooseDirectory, createDirectory, createDirectoryAndSaveFile, fileOrDirectory, listFilesInDirectory } from './backEndHelpers';

const ApiTemp2 = async (req, res) => {

	const fs = require('fs');
	const path = require('path');

const dirPath = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/HTTrack_mid-city-smiles/mid-city-smiles/www.midcitysmiles.com/blog/index.html';

const results = await fileOrDirectory(dirPath);

if(results.isDirectory()) {
	console.log('directory')
}
else {
	console.log('file');
}

	return res.json('temp');

};

export default ApiTemp2;
