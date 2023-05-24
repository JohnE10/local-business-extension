
const fs = require('fs');

const buildCssFile = async (req, res) => {

    const cssFileName = req.query.cssfileName;

    const url = req.query.url;
    console.log('buildCssFile url: ', url);

    try {

        if (url) {
            const response = await fetch(url);
            if (!response.ok) {
                throw Error('Did not get a response from server.');
            }

            const data = await response.text();

            const removeCharset = data.replace(/@charset[^;]+;/g, (match) => `/* ${match} */`);


            fs.appendFileSync(cssFileName, removeCharset);

            console.log('Done');
        }

        return res.status(200).json({ success: 'Done' });

    } catch (err) {
        console.log(err);
        return res.status(200).json({ error: err.message });
    }

}

export default buildCssFile;



