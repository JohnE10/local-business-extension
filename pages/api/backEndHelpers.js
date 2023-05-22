export const fetchUrlData = async (url) => {

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw Error('Did not get a response from server.');
    }

    const data = await response.text();
    // console.log(data);
    console.log('Done');

    return { success: data };

  } catch (err) {
    console.log(err);
    return { error: err.message };
  }

};

export const listFilesAndDirectoriesInUrl = async (url) => {

  try {
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

    return { success: [files, directories] };

  } catch (error) {
    return { error: error.message };
  }

};

export const listFilesInDirectory = async (directoryPath) => {

  const fs = require('fs');
const path = require('path');


  try {
    const files = await new Promise((resolve, reject) => {
      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          console.error('Error reading directory:', err);
          reject(err);
          return;
        }

        console.log('Files in the directory:');
        files.forEach((file) => {
          console.log(file);
        });

        resolve(files);
      });
    });

    return files;

  } catch (err) {
    return err.message;
  }
};
