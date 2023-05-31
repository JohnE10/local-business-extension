import React from 'react';

const getFileContent = (req, res) => {

    const fs = require('fs');
    const path = require('path');

    try {
        const path = req.query.path;

        let file = '';

        if (path) {
            file = fs.readFileSync(path, 'utf-8');
        }

        return res.json({ success: file })

    } catch (error) {
        return res.json({ error: 'getFileContent: ' + error.message });
    }






}

export default getFileContent;