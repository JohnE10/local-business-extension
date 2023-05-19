


const getFilesDirectoriesInUrlAPI = async (req, res) => {


    try {

        const url = req.query.url;
        console.log('url: ', url);

        const response = await fetch(url);
        const html = await response.text();

        // Regular expressions to match files and directories in the directory listing
        const fileRegex = /<a href="([^"]*\.[^"]*)"/g;
        const directoryRegex = /<a href="([^"]*\/)"/g;

        const files = [];
        const directories = [];
        let match;

        while ((match = fileRegex.exec(html)) !== null) {
            const fileName = match[1];
            files.push(fileName);
        }

        while ((match = directoryRegex.exec(html)) !== null) {
            const directoryName = match[1];
            directories.push(directoryName);
        }

        console.log('files: ', files);
        console.log('directories: ', directories);

        return res.json({success: [files, directories]});

    } catch (error) {
        console.log(error.message);
        return res.json({error: error.message});
    }
}

export default getFilesDirectoriesInUrlAPI;