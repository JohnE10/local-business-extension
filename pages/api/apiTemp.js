import axios from 'axios';
import cheerio from 'cheerio';
import { promises as fs } from 'fs';
import { styleAttrToNext } from '../../utils/helpers';


const apiTemp = (req, res) => {

  const cheerio = require('cheerio');

  // const html = `
  // <html>
  //   <head><title>This is the page title</title></head>
  //   <body>
  //     <nav id="site-navigation" class="main-navigation" aria-label="Top Menu">
  //       <div class="menu-top-container" style="background-image: url(https://www.midcitysmiles.com/blog/wp-content/uploads/2022/06/horiz-1-2000x1200.png); padding-bottom: 60%; margin-top: 25px;">
  //         <ul id="top-menu" class="menu">
  //           <li id="menu-item-80" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-12 current_page_item menu-item-80">
  //             <a href="https://www.midcitysmiles.com/blog/" aria-current="page">HOME</a></li>
  //             <li id="menu-item-144" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-144"><a href="https://www.midcitysmiles.com/blog/our-team/">OUR TEAM</a></li>
  //             <li id="menu-item-148" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-148"><a href="https://www.midcitysmiles.com/blog/contact-us/">CONTACT US</a></li>
  //             <li id="menu-item-161" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-161"><a href="https://www.midcitysmiles.com/blog/procedures/">PROCEDURES</a></li>
  //             <li id="menu-item-164" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-164"><a href="https://www.midcitysmiles.com/blog/orthodontics/">INVISALIGN</a></li>
  //             <li id="menu-item-153" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-153"><a href="https://www.midcitysmiles.com/blog/patient-forms/">PATIENT FORMS</a></li>
  //             <li id="menu-item-321" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-321"><a href="https://www.midcitysmiles.com/blog/payment-insurance/">PAYMENT/INSURANCE</a>
  //           </li>
  //         </ul>
  //       </div>
  //     </nav>
  //     <style id="core-block-supports-inline-css">
  //       .wp - block - columns.wp - container - 2 {
  //         flex - wrap: nowrap;
  //       }
  //     </style>
  //     <style id="core-block-supports-inline-css2">
  //     .wp - block - columns.wp - container - 22 {
  //       flex - wrap: nowrap;
  //     }
  //   </style>
  //   <style src="https://projectcoder.xyz"></style>
  //   <s src="https://www.midcitysmiles.com/blog/wp-content/themes/twentyseventeen/assets/js/skip-link-focus-fix.js?ver=20161114" id="twentyseventeen-skip-link-focus-fix-js">some text</script>
  //     <p style="padding-top: 60%">
  //       Some text with <b>a few <span>HTML</span></b> tags.
  //     </p>
  //     <div style="text-align: center;">
  //       <img src="https://site.com/image1" width="30rem" height="150px" />
  //       <img src="https://site.com/image2" >
  //       <img src="https://site.com/image3" >
  //     </div>
  //     <h1>
  //       This is the page title
  //     </h1>
      
  //     <figure className="wp-block-embed is-type-video is-provider-youtube wp-block-embed-youtube wp-embed-aspect-16-9 wp-has-aspect-ratio">
  //       <div className="wp-block-embed__wrapper">
  //         <iframe id="VpmVNiU4CTs" title="YouTube video player">
  //           filler text
  //         </iframe>
  //       </div>
  //   </figure>
  //   </body>
  // </html>
  // `;

  const html = `
  <html>
    <head><title>This is the page title</title></head>
    <body>
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
    <style src="https://projectcoder.xyz"></style>
    <script src="https://www.midcitysmiles.com/blog/wp-content/themes/twentyseventeen/assets/js/skip-link-focus-fix.js?ver=20161114" id="twentyseventeen-skip-link-focus-fix-js">some text</script>
      <p style="padding-top: 60%">
        Some text with <b>a few <span>HTML</span></b> tags.
      </p>
      <div style="text-align: center;">
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
  let $ = cheerio.load(html);

  let images;
  let imageSRCs = [];
  let scripts = $('body').find('script');
  let styles = $('body').find('style');



  // let tagsWithStyle = $('[style]');

  // // make css style attribute adhere to next.js rules
  // tagsWithStyle.each((i, el) => {
  //   const tagWithStyle = $.html(el);
  //   let styleAttr = $(el).attr('style');
  //   // console.log('html(el): ', styleAttr);
  //   styleAttr = styleAttrToNext(styleAttr)
  //   if (styleAttr.length > 0) {
  //     console.log(i + ' - ', styleAttr);
  //   }
  //   $(el).attr('style', styleAttr);
    
  // });

  styles.each((i, el) => {

    const temp = $(el).text();
    console.log('temp: ', temp);
    if($(el).text().trim() != '') {
      $(el).text('{`' + temp + '`}');
    }

  });

console.log($.html());

  return res.send($.html());

}

export default apiTemp;