import React from 'react'

const copyFile = (req, res) => {

    const fs = require('fs');
    const path = require('path');

    try {
        const performCopyFile = (sourcePath, destinationPath) => {
            // Resolve the absolute paths
            const source = path.resolve(sourcePath);
            const destination = path.resolve(destinationPath);

            // Check if the source file exists
            if (!fs.existsSync(source)) {
                console.log('Source file does not exist');
                return;
            }

            // Ensure the destination directory exists
            const destinationDir = path.dirname(destination);
            if (!fs.existsSync(destinationDir)) {
                fs.mkdirSync(destinationDir, { recursive: true });
            }

            // Copy the file
            fs.copyFile(source, destination, (err) => {
                if (err) {
                    console.log('Error copying file:', err);
                } else {
                    console.log('File copied successfully');
                }
            });
        };

        // Usage
        // const sourceFile = req.query.sourceFile;
        // const destinationFile = req.query.destinationFile;

        performCopyFile(req, res);

        // return res.json({ success: `${sourceFile} has been moved to ${destinationFile}` });
        return 'Done.'
        

    } catch (error) {
        console.log('copyFile error: ', error.message);
        // return res.json({ error: error.message });
    }




}

export default copyFile;