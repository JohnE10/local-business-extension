import axios from 'axios';
import cheerio from 'cheerio';
import { promises as fs } from 'fs';

const apiTemp = (req, res) => {

  const cheerio = require('cheerio');

  const html = `
  <html>
    <head><title>This is the page title</title></head>
    <body>
      <nav id="site-navigation" class="main-navigation" aria-label="Top Menu">
        <div class="menu-top-container">
          <ul id="top-menu" class="menu">
            <li id="menu-item-80" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-12 current_page_item menu-item-80">
              <a href="https://www.midcitysmiles.com/blog/" aria-current="page">HOME</a></li>
              <li id="menu-item-144" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-144"><a href="https://www.midcitysmiles.com/blog/our-team/">OUR TEAM</a></li>
              <li id="menu-item-148" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-148"><a href="https://www.midcitysmiles.com/blog/contact-us/">CONTACT US</a></li>
              <li id="menu-item-161" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-161"><a href="https://www.midcitysmiles.com/blog/procedures/">PROCEDURES</a></li>
              <li id="menu-item-164" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-164"><a href="https://www.midcitysmiles.com/blog/orthodontics/">INVISALIGN</a></li>
              <li id="menu-item-153" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-153"><a href="https://www.midcitysmiles.com/blog/patient-forms/">PATIENT FORMS</a></li>
              <li id="menu-item-321" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-321"><a href="https://www.midcitysmiles.com/blog/payment-insurance/">PAYMENT/INSURANCE</a>
            </li>
          </ul>
        </div>
      </nav>
      <style id="core-block-supports-inline-css">
        .wp - block - columns.wp - container - 2 {
          flex - wrap: nowrap;
        }
      </style>
      <style id="core-block-supports-inline-css2">
      .wp - block - columns.wp - container - 22 {
        flex - wrap: nowrap;
      }
    </style>
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
      
      <figure className="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio">
        <div className="wp-block-embed__wrapper">
          <iframe id="VpmVNiU4CTs" title="YouTube video player">
            filler text
          </iframe>
        </div>
    </figure>
    </body>
  </html>
  `;

  let images;
  let imageSRCs = [];

  let $ = cheerio.load(html);

  let body = $('body');

  const temp = 'https://site.com/image1';

  images = $('body').find('img');

  const styles = $('body').find('style');
  const scripts = $('body').find('script');
  const iframes = $('body').find('iframe');
  const navLinks = $('body').find('nav').find('ul').find('li');



  // console.log('styles.html(): ', styles.html());

  // images.each((i, el) => {
  //   // console.log('results: ', $(el).attr('src'));
  //   const imgAttr = $(el).attr('src');
  //   console.log('imgAttr: ', imgAttr);

  //   if ($(el).attr('width')) {
  //     let imgWidth = $(el).attr('width');
  //     let imgHeight = $(el).attr('height');
  //     imgWidth = imgWidth.replace('px', '').replace('rem', '').replace('em', '');
  //     imgHeight = imgHeight.replace('px', '').replace('rem', '').replace('em', '');
  //     $(`img[src='${imgAttr}']`).replaceWith(`<img src='${imgAttr}' alt='/' width='${imgWidth}' height='${imgHeight}' >`);
  //   }
  //   else {
  //     $(`img[src='${imgAttr}']`).replaceWith(`<img src='${imgAttr}' alt='/' width='150' height='150' >`);
  //   }
  // });

  // styles.each((i, el) => {
  //   let elementHtml = $(el).html();
  //   let attrId = '';
  //   let attrClass = '';
  //   if ($(el).attr('id')) {
  //     attrId = $(el).attr('id');
  //     console.log('attrId: ', attrId);
  //   }

  //   if ($(el).attr('class')) {
  //     attrClass = $(el).attr('class');
  //     console.log('attrClass: ', attrClass);
  //   }

  //   if (attrId != '') {
  //     $('body').find(`style[id="${attrId}"]`).replaceWith(`<style id='${attrId}'>` + '{`' + $(el).html() + '`}' + '</style>')
  //   }
  //   else if(attrClass != '') {
  //     $('body').find(`style[class="${attrClass}"]`).replaceWith(`<style id='${attrId}'>` + '{`' + $(el).html() + '`}' + '</style>')
  //   }

  // });

  // iframes.each((i, el) => {
  //   console.log('$(el).parent: ', $(el).parent().prop('tagName'));
  // });

  // body = $('body').html();

  // function to add self closing slash to all Image tags.
  // const updatedBody = body.replace(/<img.*?>/g, (match) => {
  // body = body.replace(/<img.*?>/g, (match) => {
  //   if (!match.endsWith('/>')) {

  //     // console.log(match + ' - ' + 'yes');
  //     return `${match}/>`;
  //   }
  //   return match;
  // });

  // console.log('body.html(): ', body);

  return res.send(navLinks);

}

export default apiTemp;