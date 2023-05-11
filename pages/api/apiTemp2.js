const emailValidator = require('deep-email-validator');

const ApiTemp2 = async (req, res) => {

    const content = `
    <html>
      <head><title>This is the page title</title></head>
      <body>
        <p>
          Some text with <b>a few <span>HTML</span></b> tags.
        </p>
        <div>
          <img src="https://site.com/image1" width="30rem" height="150px" />
          <img src="https://site.com/image2" >
          <img src="https://site.com/image3" >
        </div>
        <h1>
          This is the page title
        </h1>
      </body>
    </html>
    `;

    const updatedContent = content.replace(/<img.*?>/g, (match) => {
      if (!match.endsWith('/>')) {
        // return `${match}/>`;
        console.log('match: ', match);
        console.log(typeof match);
        return match.replace('>', '') + ' />';
      }
      return match;
    });
    
    console.log('updatedContent: ', updatedContent); // '<img src="https://site.com/image1" width="30rem" height="150px"/>'
    

    return res.send(updatedContent);

}

export default ApiTemp2;