import { useState, useEffect } from 'react';

const cheerio = require('cheerio');

const temp = () => {

  const html = `
  <html>
    <head><title>This is the page title</title></head>
    <body>
      <p>
        Some text with <b>a few <span>HTML</span></b> tags.
      </p>
      <div>
        <img src="https://site.com/image1" />
        <img src="https://site.com/image2" />
        <img src="https://site.com/image3" />
      </div>
      <h1>
        This is the page title
      </h1>
    </body>
  </html>
  `;

  const [htmlString, setHtmlString] = useState(html);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const images = doc.querySelectorAll('img');

    // images.forEach((image) => {
    //   let temp = "https://site.com/replaced1";
    //   const newImage = doc.createElement('img');
    //   newImage.src = temp;
    //   image.parentNode.replaceChild(newImage, image);
    // });
    
    images.forEach((image) => {

      // let temp = "https://site.com/replaced1";
      let newImage = doc.createElement('img');
      newImage.src = image.src;
      if(image.width) {
        newImage.width = image.width;
      }
      else {
        newImage.width = '150';
      }

      if(image.height) {

      }

      newImage.width='150';
      newImage.height='150';

      image.parentNode.replaceChild(newImage, image);

      console.log('newImage: ', newImage);
      console.log('newImage.width: ', newImage.width);

    });
    
    setHtmlString(doc.documentElement.outerHTML.replaceAll('<img', '<Image'));
    
    // console.log(htmlString);

  }, [htmlString]);

  return (
    <>
    {htmlString}
    <br /><br />
    {typeof htmlString}
    </>
  )
}

export default temp