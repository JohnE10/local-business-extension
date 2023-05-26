import React from 'react'

const nodeHelpers = (req, res) => {

    const deleteDirectoryContents = (directoryPath) => {

        const fs = require('fs');
        const path = require('path');
      
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
          return directoryPath + ' content deleted.';
      
        } catch (error) {
          console.log(error);
          return error.message;
        }
      
      }


}

export default nodeHelpers;