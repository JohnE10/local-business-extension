import { split } from 'postcss/lib/list';
import { fileTree, isAbsoluteURL } from '../../utils/helpers';
import { checkLink, chooseDirectory, copyFile, createDirectory, createDirectoryAndSaveFile, deleteDirectoryContents, fileOrDirectory, listFilesInDirectory, searchForFile } from './backEndHelpers';




const ApiTemp2 = async (req, res) => {

	const temp = req.body;
	console.log({temp});

	return res.json({success: 'temp'})

};

export default ApiTemp2;
