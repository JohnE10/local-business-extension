export const fetchUrlData = async (url) => {

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw Error('Did not get a response from server.');
    }

    const data = await response.text();
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

export const fileOrDirectory = async (path) => {
  // Import the filesystem module
  const fs = require('fs');

  // Getting information for a file
  try {
    const results = await new Promise((resolve, reject) => {
      fs.stat(path, (error, stats) => {
        if (error) {
          console.log(error);
          return error.message;
        }
        else {
          // // console.log("Stats object for: example_file.txt");
          // console.log({ stats });

          // // Using methods of the Stats object
          console.log("Path is file:", stats.isFile());
          console.log("Path is directory:", stats.isDirectory());
        }
        resolve(stats);
      });
    });

    return results

  } catch (error) {
    return error.message;
  }



};

export const createDirectoryAndSaveFile = (filePath, fileContent) => {

  const fs = require('fs');
  const path = require('path');

  try {

    const directoryPath = path.dirname(filePath);

    fs.mkdir(directoryPath, { recursive: true }, (err) => {
      if (err) {
        console.error('Failed to create directory:', err);
      } else {
        fs.writeFile(filePath, fileContent, (err) => {
          if (err) {
            console.error('Failed to save file:', err);
          } else {
            console.log('File saved successfully!');
          }
        });
      }
    });

    return 'created';

  } catch (error) {
    return error.message;
  }

};

export const deleteDirectoryContents = (directoryPath) => {

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

};

export const copyFile = (sourcePath, destinationPath) => {

  const fs = require('fs');
  const path = require('path');

  try {
    // Resolve the absolute paths
    const source = path.resolve(sourcePath);
    const destination = path.resolve(destinationPath);

    // Check if the source file exists
    if (!fs.existsSync(source)) {
      console.log(source + ' does not exist');
      return;
    }

    // Ensure the destination directory exists
    const destinationDir = path.dirname(destination);
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destination, { recursive: true });
    }

    // Copy the file
    const temp = fs.readFileSync(source, 'utf-8');
    fs.writeFileSync(destination, temp);

    // fs.copyFile(source, destination, (err) => {
    //   if (err) {
    //     console.log('Error copying file ' + source + ': ', err);
    //   } else {
    //     console.log('File copied successfully');
    //   }
    // });

    return ('File copied')

  } catch (error) {
    console.log('copyFile error: ', error.message);
    return ('copyFile error: ' + error.message);
  }
};

export const checkLink = async (link) => {

  const fetch = require('isomorphic-unfetch');

  try {
    const response = await fetch(link);
    if (response.ok) {
      console.log(`${link} is a good link.`);
      return `${link} is a good link.`;
    } else {
      console.log(`${link} is a broken link.`);
      throw Error(`${link} is a broken link.`);
      // return `${link} is a broken link.`
    }
  } catch (error) {
    console.error(`Error checking link: ${link}`, error.message);
    return (`Error checking link: ${link}`, error.message);
  }
};

export const searchForFile = (directory, filename) => {

  const fs = require('fs');
  const path = require('path');

  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      const foundFile = searchForFile(filePath, filename);
      if (foundFile) {
        return foundFile;
      }
    } else if (file === filename) {
      return filePath;
    }
  }

  return null;
};




