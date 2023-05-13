import { fetchUrlData } from './backEndHelpers';

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

const url = 'https://www.midcitysmiles.com/blog/';

// const html = await fetchUrlData(url);

const response = await fetch(url);
const data = await response.text();

console.log('data: ', data);

return res.send(JSON.stringify(data));

// console.log('html: ', html);

}

export default ApiTemp2;