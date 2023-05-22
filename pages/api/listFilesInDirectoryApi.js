import { listFilesInDirectory } from './backEndHelpers';


const listFilesInDirectoryApi = async (req, res) => {

    try {

        const directoryPath = req.query.directoryPath;
        console.log({directoryPath});

        // const directoryPath ='siteFiles/pagesToBuild/';
        const results = await listFilesInDirectory(directoryPath);

        return res.json({ success: results });

    } catch (error) {
        return res.json({ error: error.message });
    }

}

export default listFilesInDirectoryApi;