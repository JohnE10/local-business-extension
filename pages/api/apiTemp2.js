import { split } from 'postcss/lib/list';
import { fileTree, isAbsoluteURL } from '../../utils/helpers';
import { checkLink, chooseDirectory, copyFile, createDirectory, createDirectoryAndSaveFile, deleteDirectoryContents, fileOrDirectory, listFilesInDirectory } from './backEndHelpers';




const ApiTemp2 = async (req, res) => {

	const fs = require('fs');
	const path = require('path');

	// const results = checkLink(link);

	const file = 'siteFiles/temp4/temp1/temp2/temp3/index.html';

	const results = createDirectoryAndSaveFile(file);

	return res.json(results);
	
};

export default ApiTemp2;
