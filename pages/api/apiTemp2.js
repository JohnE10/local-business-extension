import { split } from 'postcss/lib/list';
import { fileTree } from '../../utils/helpers';
import { chooseDirectory, createDirectory, createDirectoryAndSaveFile, deleteDirectoryContents, fileOrDirectory, listFilesInDirectory } from './backEndHelpers';

const ApiTemp2 = async (req, res) => {

	const fs = require('fs');
	const path = require('path');
	const postcss = require('postcss');
	const cssnano = require('cssnano');
	const valueParser = require('postcss-value-parser');
	const csstree = require('css-tree');



	function addSemicolonsToCSS() {
		// const cssFilePath = path.join(__dirname, 'path_to_your_css_file.css');

		const cssFilePath = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/smilingfacesnola/pages/stylesheets.css';

		// Read the CSS file
		let css = fs.readFileSync(cssFilePath, 'utf8');

		css = css.replaceAll('}', ';}');
		css = css.replaceAll(';;', ';');

		console.log(css);

		// // split css
		// const splitCss = css.split('.');
		// console.log(splitCss);

		// const modifiedSplicScc = splitCss.map((ele) => {

		// 		if (ele.includes('{') && ele.includes('}')) {
		// 			return ele;
		// 			// // if(ele == 'undefined' || ele == '') {
		// 			// // 	return '';
		// 			// // }
		// 			// if (!ele.includes(';}')) {
		// 			// 	ele = ele.replace('}', ';}');
		// 			// 	return ele;
		// 			// }
		// 			// // else {
		// 			// // 	return 'nothing';
		// 			// // }
		// 		}
		// });

		// console.log(modifiedSplicScc);
	}

	addSemicolonsToCSS();

	// async function optimizeAndMinifyCSS() {
	// 	// const cssFilePath = path.join(__dirname, 'temp.css');
	// 	const cssFilePath = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/smilingfacesnola/pages/stylesheets.css';

	// 	// Read the CSS file
	// 	const css = fs.readFileSync(cssFilePath, 'utf8');

	// 	// Process the CSS using PostCSS and cssnano
	// 	const processedCss = await postcss([cssnano()]).process(css, {
	// 		from: cssFilePath,
	// 		to: cssFilePath
	// 	});

	// 	// Get the optimized and minified CSS
	// 	const optimizedCss = processedCss.css;

	// 	// Write the optimized CSS back to the file
	// 	fs.writeFileSync(cssFilePath, optimizedCss, 'utf8');

	// 	// console.log('CSS optimized and minified.');
	// 	console.log(optimizedCss);
	// }

	// optimizeAndMinifyCSS();





	return res.json('Done');

};

export default ApiTemp2;
