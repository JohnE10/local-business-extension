import { chooseDirectory, listFilesInDirectory } from './backEndHelpers';

const ApiTemp2 = async (req, res) => {

	const fs = require('fs');
	const path = require('path');

	const pathDirectory = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/http___www.midcitysmiles.com_blog/www.midcitysmiles.com/blog/';

	const temp = await listFilesInDirectory(pathDirectory);

	return res.json({ success: temp });

};

export default ApiTemp2;
