import { split } from 'postcss/lib/list';
import { fileTree, isAbsoluteURL } from '../../utils/helpers';
import { checkLink, chooseDirectory, copyFile, createDirectory, createDirectoryAndSaveFile, deleteDirectoryContents, fileOrDirectory, listFilesInDirectory, searchForFile } from './backEndHelpers';




const ApiTemp2 = async (req, res) => {

	const fs = require('fs');
	const path = require('path');

	const directory = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/smilingfacesnola/public/';

	const filename = 'Defaults21ea.eot';

	const foundFilePath = searchForFile(directory, filename);
	if (foundFilePath) {
		console.log(`File found at: ${foundFilePath}`);
	} else {
		console.log(`File not found.`);
	}
	
	return res.json({success: 'Done'})
};

export default ApiTemp2;
