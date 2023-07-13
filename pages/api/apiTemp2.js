import { split } from 'postcss/lib/list';
import { fileTree, isAbsoluteURL } from '../../utils/helpers';
import { checkLink, chooseDirectory, copyFile, createDirectory, createDirectoryAndSaveFile, deleteDirectoryContents, fileOrDirectory, listFilesInDirectory, searchForFile } from './backEndHelpers';
import { dbConnect } from '../../middleware/dbConnect';
import Business from '../../models/business';




const ApiTemp2 = async (req, res) => {
	
	const tempBoolean = !await Business.findOne({ email: 'aaronsoncall@outlook.com'})
	console.log({tempBoolean});
	// if(tempBoolean) {
	// 	console.log('yes, found');
	// }
	// else {
	// 	console.log('no, not found');
	// }

	return res.json({success: 'temp'})

};

export default ApiTemp2;
