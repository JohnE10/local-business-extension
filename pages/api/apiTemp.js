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

  let images;
  let imageSRCs = [];

  let $ = cheerio.load(html);

  let body = $('body');

  const temp = 'https://site.com/image1';

  // console.log('body: ', body);
  images = $('body').find('img');

  images.each((i, el) => {
    // console.log('results: ', $(el).attr('src'));
    const imgAttr = $(el).attr('src');
    console.log('imgAttr: ', imgAttr);

    if ($(el).attr('width')) {
      let imgWidth = $(el).attr('width');
      let imgHeight = $(el).attr('height');
      imgWidth = imgWidth.replace('px', '').replace('rem', '').replace('em', '');
      imgHeight = imgHeight.replace('px', '').replace('rem', '').replace('em', '');
      $(`img[src='${imgAttr}']`).replaceWith(`<img src='${imgAttr}' alt='/' width='${imgWidth}' height='${imgHeight}' >`);
    }
    else {
      $(`img[src='${imgAttr}']`).replaceWith(`<img src='${imgAttr}' alt='/' width='150' height='150' >`);
    }
  });

  body = body.html();

  let content = '<img src="https://site.com/image1" width="30rem" height="150px">';

  // function to add self closing slash to all Image tags.
  // const updatedBody = body.replace(/<img.*?>/g, (match) => {
    body = body.replace(/<img.*?>/g, (match) => {
    if (!match.endsWith('/>')) {

      console.log(match + ' - ' + 'yes');
      return `${match}/>`;
    }
    return match;
  });

  console.log('body.html(): ', body);

  return res.send(body);

}