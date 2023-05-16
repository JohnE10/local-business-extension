import fs from 'fs';
import path from 'path';
import axios from 'axios';

const downloadAllImageAPI = async (req, res) => {

    const cheerio = require('cheerio');

    const tagName = 'a';
    const tagAttr = 'href';

    const { url } = req.query;

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const images = $(`${tagName}`);
        images.each(async (index, element) => {
            const imgUrl = $(element).attr(`${tagAttr}`);
            console.log('imgUrl', imgUrl);
            const imgName = path.basename(imgUrl);
            console.log('imgName: ', imgName);
            const imgPath = path.join('siteFiles/images', imgName);
            // if (imgName.includes('.png') || imgName.includes('.jpg') || imgName.includes('.jpeg')) {
            //     const imgResponse = await axios.get(imgUrl, { responseType: 'stream' });
            //     const writer = fs.createWriteStream(imgPath);
            //     imgResponse.data.pipe(writer);
            // }

        });
        return res.status(200).json({ success: 'Images downloaded successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error downloading images.' });
    }
}

export default downloadAllImageAPI;