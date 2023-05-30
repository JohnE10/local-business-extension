import axios from 'axios';
import cheerio from 'cheerio';
import { fileNameFromUrl, isAbsoluteURL, styleAttrToNext } from '../../utils/helpers';


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
    <script type="text/javascript" id=" EQfH2Mr3Ym">function setREVStartSize(e){			
			try {								
				var pw = document.getElementById(e.c).parentNode.offsetWidth,
					newh;
				pw = pw===0 || isNaN(pw) ? window.innerWidth : pw;
				e.tabw = e.tabw===undefined ? 0 : parseInt(e.tabw);
				e.thumbw = e.thumbw===undefined ? 0 : parseInt(e.thumbw);
				e.tabh = e.tabh===undefined ? 0 : parseInt(e.tabh);
				e.thumbh = e.thumbh===undefined ? 0 : parseInt(e.thumbh);
				e.tabhide = e.tabhide===undefined ? 0 : parseInt(e.tabhide);
				e.thumbhide = e.thumbhide===undefined ? 0 : parseInt(e.thumbhide);
				e.mh = e.mh===undefined || e.mh=="" || e.mh==="auto" ? 0 : parseInt(e.mh,0);		
				if(e.layout==="fullscreen" || e.l==="fullscreen") 						
					newh = Math.max(e.mh,window.innerHeight);				
				else{					
					e.gw = Array.isArray(e.gw) ? e.gw : [e.gw];
					for (var i in e.rl) if (e.gw[i]===undefined || e.gw[i]===0) e.gw[i] = e.gw[i-1];					
					e.gh = e.el===undefined || e.el==="" || (Array.isArray(e.el) && e.el.length==0)? e.gh : e.el;
					e.gh = Array.isArray(e.gh) ? e.gh : [e.gh];
					for (var i in e.rl) if (e.gh[i]===undefined || e.gh[i]===0) e.gh[i] = e.gh[i-1];
										
					var nl = new Array(e.rl.length),
						ix = 0,						
						sl;					
					e.tabw = e.tabhide>=pw ? 0 : e.tabw;
					e.thumbw = e.thumbhide>=pw ? 0 : e.thumbw;
					e.tabh = e.tabhide>=pw ? 0 : e.tabh;
					e.thumbh = e.thumbhide>=pw ? 0 : e.thumbh;					
					for (var i in e.rl) nl[i] = e.rl[i]<window.innerWidth ? 0 : e.rl[i];
					sl = nl[0];									
					for (var i in nl) if (sl>nl[i] && nl[i]>0) { sl = nl[i]; ix=i;}															
					var m = pw>(e.gw[ix]+e.tabw+e.thumbw) ? 1 : (pw-(e.tabw+e.thumbw)) / (e.gw[ix]);					

					newh =  (e.type==="carousel" && e.justify==="true" ? e.gh[ix] : (e.gh[ix] * m)) + (e.tabh + e.thumbh);
				}			
				
				if(window.rs_init_css===undefined) window.rs_init_css = document.head.appendChild(document.createElement("style"));					
				document.getElementById(e.c).height = newh;
				window.rs_init_css.innerHTML += "#"+e.c+"_wrapper { height: "+newh+"px }";				
			} catch(e){
				console.log("Failure at Presize of Slider:" + e)
			}					   
		  };
      </script>

      
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
    <div class="menu-top-container"><ul id="top-menu" class="menu"><li id="menu-item-80" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-12 current_page_item menu-item-80"><a href="index.html" aria-current="page">HOME</a></li>
    <li id="menu-item-144" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-144"><a href="our-team/index.html">OUR TEAM</a></li>
    <li id="menu-item-148" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-148"><a href="contact-us/index.html">CONTACT US</a></li>
    <li id="menu-item-161" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-161"><a href="procedures/index.html">PROCEDURES</a></li>
    <li id="menu-item-164" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-164"><a href="orthodontics/index.html">INVISALIGN</a></li>
    <li id="menu-item-153" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-153"><a href="patient-forms/index.html">PATIENT FORMS</a></li>
    <li id="menu-item-321" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-321"><a href="payment-insurance/index.html">PAYMENT/INSURANCE</a></li>
    </ul></div>
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

    <script type="text/javascript">
    setREVStartSize({c: 'rev_slider_1_1',rl:[1240,1024,778,480],el:[500],gw:[1240],gh:[500],type:'hero',justify:'',layout:'fullwidth',mh:"0"});
    var	revapi1,
      tpj;
    
  </script>


    </body>
  </html>
  `;

  let $ = cheerio.load(html);

  let images;
  let imageSRCs = [];
  let scripts = $('body').find('script');
  let styles = $('body').find('style');
  let TagsWithStylesheet = $('link[rel="stylesheet"]');
  let aTags = $('body').find('a');
  let headScripts = $('head').find('script');

  // console.log($.html(headScripts));
  let setREVStartSizeTag = '';

  headScripts.each((i, el) => {
    let temp = $(el).text();
    if(temp && temp.includes('setREVStartSize(e)')) {
      setREVStartSizeTag = $.html(el);
      return false;
    }

  });

  scripts.each((i, el) => {
    let temp = $(el).text();
    if (temp && temp.includes('setREVStartSize')) {
      $(el).replaceWith(setREVStartSizeTag + '\n' + $.html(el));
      return false;
    }
  });

  console.log($.html());



  // const targetElement = $.html(scripts).find('script:contains("setREVStartSize")');

  // console.log({targetElement})


  //   aTags.each((i, el) => {
  //     if ($(el).attr('href')) {
  //         let temp = $(el).attr('href').trim();
  //         if (!isAbsoluteURL(temp)) {
  //             if (temp.includes('.html')) {
  //                 if (fileNameFromUrl(temp).parentDirectory == '') {
  //                     $(el).attr('href', '/');
  //                 }
  //                 else {
  //                     const filename = fileNameFromUrl(temp).fileName;
  //                     temp = temp.replace(filename, '');
  //                     $(el).attr('href', temp);
  //                 }
  //             }

  //         }
  //     }
  // });

  // $('[href*="googleapis.com"]').each((index, element) => {
  //   const href = $(element).attr('href');
  //   console.log('href: ', href);
  //   const updatedHref = `${href}&display=optional`;
  //   $(element).attr('href', updatedHref);
  // });

  // console.log($.html());

  return res.send($.html());

}

export default apiTemp;