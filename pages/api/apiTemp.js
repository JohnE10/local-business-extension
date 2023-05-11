import axios from 'axios';
import cheerio from 'cheerio';
import { promises as fs } from 'fs';

export default function PageScraper(req, res) {

  const cheerio = require('cheerio');
  
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

  let images;
  let imageSRCs = [];

  let $ = cheerio.load(html);

  let body = $('body');

  const temp =  'https://site.com/image1';

  // $('img[src="https://site.com/image1"]').replaceWith('<Image />');
$('img[src="https://site.com/image1"]').replaceWith('<Image src="https://site.com/image1" />');

  console.log('body: ', body);
  images = $('body').find('img');

  // images.each((i, el) => {
  //   console.log('results: ', $(el).attr('src'));
  //   imageSRCs.push($(el).attr('src'));
  // });

  console.log('imageSRCs: ', imageSRCs);

  return res.send('');

}