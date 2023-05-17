import axios from 'axios';
import cheerio from 'cheerio';
import { styleAttrToNext } from '../../utils/helpers';


const apiTemp = (req, res) => {

  const cheerio = require('cheerio');
  const fs = require('fs');

  const html = `
  <html>
    <head>
    <title>This is the page title</title>
    <link rel="stylesheet" id="wpzoom-social-icons-block-style-css" href="https://www.midcitysmiles.com/blog/wp-content/plugins/social-icons-widget-by-wpzoom/block/dist/style-wpzoom-social-icons.css?ver=4.2.11" media="all" />
    <link rel="stylesheet" id="classic-theme-styles-css" href="https://www.midcitysmiles.com/blog/wp-includes/css/classic-themes.min.css?ver=1" media="all" />
    <link href="https://fonts.gstatic.com" crossorigin="" rel="preconnect" />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com/" />
    </head>
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
  let TagsWithStylesheet = $('link[rel="stylesheet"]');

  $('[href*="googleapis.com"]').each((index, element) => {
    const href = $(element).attr('href');
    console.log('href: ', href);
    const updatedHref = `${href}&display=optional`;
    $(element).attr('href', updatedHref);
  });

  console.log($.html());

  return res.send($.html());

}

export default apiTemp;