
const temp = () => {

  async function listFilesAndDirectories(url) {
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
  
    return {
      files,
      directories
    };
  }
  
  // Example usage:
  const url = 'https://www.midcitysmiles.com/blog/wp-includes/css/';
  listFilesAndDirectories(url)
    .then(({ files, directories }) => {
      console.log('Files:');
      console.log(files);
  
      console.log('Directories:');
      console.log(directories);
    })
    .catch(error => {
      console.error(error);
    });
  

  return (
    <div>temp</div>
  )
}

export default temp;