import React from 'react'

const moveFile = (req, res) => {

    const fs = require('fs');
    const path = require('path');

    try {
            const performMoveFile = (sourcePath, destinationPath) => {
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

        // Move the file
        fs.rename(source, destination, (err) => {
            if (err) {
                console.log('Error moving file:', err);
            } else {
                console.log('File moved successfully');
            }
        });
    };

    // Usage
    const sourceFile = req.query.sourceFile;
    const destinationFile = req.query.destinationFile;

    performMoveFile(sourceFile, destinationFile);

    return res.json({success: `${sourceFile} has been moved to ${destinationFile}`});

    } catch (error) {
        console.log('moveFile Error: ', error.message);
        return res.json({error: error.message});
    }



}

export default moveFile;