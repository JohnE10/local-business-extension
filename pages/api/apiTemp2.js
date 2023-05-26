import { fileTree } from '../../utils/helpers';
import { chooseDirectory, createDirectory, createDirectoryAndSaveFile, deleteDirectoryContents, fileOrDirectory, listFilesInDirectory } from './backEndHelpers';

const ApiTemp2 = async (req, res) => {

	const fs = require('fs');
	const path = require('path');

	const siteFileDir = 'siteFiles/';

	const dirPath = 'siteFiles/pages/';

	const results = deleteDirectoryContents(dirPath);

	console.log({ results });

	return res.json(results);

};

export default ApiTemp2;
