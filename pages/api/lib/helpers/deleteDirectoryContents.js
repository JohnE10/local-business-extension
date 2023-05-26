
const deleteDirectoryContents = (req, res) => {

    const fs = require('fs');
    const path = require('path');

    const directoryPath = req.query.path
    console.log({directoryPath});
  
    try {
      if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file) => {
          const currentPath = path.join(directoryPath, file);
  
          if (fs.lstatSync(currentPath).isDirectory()) {
            deleteDirectoryContents(currentPath);
            fs.rmdirSync(currentPath);
            console.log(`Deleted directory: ${currentPath}`);
          } else {
            fs.unlinkSync(currentPath);
            console.log(`Deleted file: ${currentPath}`);
          }
        });
  
        console.log(`Deleted contents of directory: ${directoryPath}`);
      } else {
        console.log(`Directory does not exist: ${directoryPath}`);
      }
    //   return directoryPath + ' content deleted.';
    return res.json({success: `Deleted contents of directory: ${directoryPath}`});
  
    } catch (error) {
      console.log(error);
    //   return error.message;
    return res.json({'deleteDirectoryContents error': error.message});
    }

}

export default deleteDirectoryContents;