import React from 'react'

const createDirectoryAndSaveFile = async (req, res) => {

        const fs = require('fs');
        const path = require('path');

        const filePath = req.query.path;
        const fileContent  = req.query.content;

        try {

            const directoryPath = path.dirname(filePath);

            fs.mkdir(directoryPath, { recursive: true }, (err) => {
                if (err) {
                    console.error('Failed to create directory:', err);
                } else {
                        fs.appendFileSync(filePath, fileContent + '\n', (err) => {
                        if (err) {
                            console.error('Failed to save file:', err);
                        } else {
                            console.log(`${directoryPath} saved successfully!`, 'fileContent: ', fileContent);
                        }
                    });
                }
            });

            return res.json({success: 'Created'});

        } catch (error) {
            return res.json({error});
        }


}

export default createDirectoryAndSaveFile;