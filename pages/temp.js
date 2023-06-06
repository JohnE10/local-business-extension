import { fileNameFromUrl, isValidUrl } from '/utils/helpers';
const path = require('path');
const cheerio = require('cheerio');

const temp = () => {

  //   const html = `
  //   <html>
  //   <body>
  //   <nav class="menu-top-container" aria-label="Menu">
  //   <section id="someId">
  //   <ul id="menu-top" class="menu">
  //     <li
  //       class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-80">
  //       <a href="/index.html">HOME</a></li>
  //     <li
  //       class="menu-item menu-item-type-post_type menu-item-object-page menu-item-144">
  //       <a href="/our-team/index.html">OUR TEAM</a></li>
  //     <li
  //       class="menu-item menu-item-type-post_type menu-item-object-page menu-item-148">
  //       <a href="/contact-us/index.html">CONTACT US</a></li>
  //     <li
  //       class="menu-item menu-item-type-post_type menu-item-object-page menu-item-153">
  //       <a href="/patient-forms/index.html">PATIENT FORMS</a></li>
  //     <li
  //       class="menu-item menu-item-type-post_type menu-item-object-page menu-item-161">
  //       <a href="/procedures/index.html">PROCEDURES</a></li>
  //     <li
  //       class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-163 current_page_item menu-item-164">
  //       <a href="index.html" aria-current="page">INVISALIGN</a></li>
  //   </ul>
  // </nav>

  // <nav id="site-navigation" class="main-navigation" aria-label="Top Menu">
  // <button class="menu-toggle" aria-controls="top-menu" aria-expanded="false">
  //   <svg class="icon icon-bars" aria-hidden="true" role="img">
  //     <use href="#icon-bars" xlink:href="#icon-bars"></use>
  //   </svg><svg class="icon icon-close" aria-hidden="true" role="img">
  //     <use href="#icon-close" xlink:href="#icon-close"></use>
  //   </svg>Menu </button>

  // <div class="menu-top-container">
  //   <ul id="top-menu" class="menu">
  //     <li id="menu-item-80"
  //       class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-80">
  //       <a href="/index.html">HOME</a></li>
  //     <li id="menu-item-144"
  //       class="menu-item menu-item-type-post_type menu-item-object-page menu-item-144"><a
  //         href="/our-team/index.html">OUR TEAM</a></li>
  //     <li id="menu-item-148"
  //       class="menu-item menu-item-type-post_type menu-item-object-page menu-item-148"><a
  //         href="/contact-us/index.html">CONTACT US</a></li>
  //     <li id="menu-item-153"
  //       class="menu-item menu-item-type-post_type menu-item-object-page menu-item-153"><a
  //         href="/patient-forms/index.html">PATIENT FORMS</a></li>
  //     <li id="menu-item-161"
  //       class="menu-item menu-item-type-post_type menu-item-object-page menu-item-161"><a
  //         href="/procedures/index.html">PROCEDURES</a></li>
  //     <li id="menu-item-164"
  //       class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-163 current_page_item menu-item-164">
  //       <a href="index.html" aria-current="page">INVISALIGN</a></li>
  //   </ul>
  // </div>
  // </nav>
  // </body>
  // </html>
  //   `;

  // const cheerio = require('cheerio');
  // let $ = cheerio.load(html);



  let html = `
  <html>
  <body>
    <nav class="menu-top-container" aria-label="Menu">
    </nav>
  <section id="someId">

  <div class="contact-footer">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.3872559654556!2d-90.06335348488602!3d29.997034881899552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8620a8c7573ac827%3A0x7e0479529c1ec235!2s3004+Gentilly+Blvd%2C+New+Orleans%2C+LA+70122!5e0!3m2!1sen!2sus!4v1505431069188" width="600" height="450" frameBorder="0" style={{ border: '0' }} allowFullScreen="">
    </iframe>
  </div>

  <aside className="widget_text widget widget_custom_html">
		
								<h3 className="widget-title">Follow Us On…</h3>
								<div className="textwidget custom-html-widget">
				
									<Link href="https://www.facebook.com/DumasFamilyDentistryNewOrleans/" target="_blank" rel="noopener"><Image src="/wp-content/uploads/facebook.png" style={{ paddingRight: '5px' }} width="32" height="32" priority="false" alt="" />
									</Link>
									<Link href="https://www.instagram.com/dumasfamilydentistrynola/" target="_blank" rel="noopener"><Image src="/wp-content/uploads/2022/07/instagram.png" style={{ paddingRight: '5px' }} width="32" height="32" priority="false" alt="" />
									</Link>
								</div>
							</aside>


  </body>
  </html>
  `;

  const iframeReplace = `
  <div>
      <a href="https://www.google.com/maps?ll=29.997125,-90.061094&z=15&t=m&hl=en-US&gl=US&mapclient=embed&q=3004+Gentilly+Blvd+New+Orleans,+LA+70122" target="_blank">
          <Image 
          src="/images/dumasDentistry.png" alt="Dumas Family Dentistry - New Orleans Dentist" 
          width="307" 
          height="204" 
          priority="false" />
          </a>
      </div>
  `;

  const asideReplace = `
  <aside style={{ display: 'flex', flexDirection: 'column' }}>
  <h3 className="widget-title">Follow Us On…</h3>

  <div style={{ display: 'flex' }}>
    <Link href="https://www.facebook.com/DumasFamilyDentistryNewOrleans/" target="_blank" rel="noopener"><Image src="/wp-content/uploads/facebook.png" style={{ paddingRight: '5px' }} width="32" height="32" priority="false" alt="" />
    </Link>
    <Link href="https://www.instagram.com/dumasfamilydentistrynola/" target="_blank" rel="noopener"><Image src="/wp-content/uploads/2022/07/instagram.png" style={{ paddingRight: '5px' }} width="32" height="32" priority="false" alt="" />
    </Link>
  </div>
</aside>
  `;

  console.log({ iframeReplace });

  const $ = cheerio.load(html);

  let asideTags = $('body').find('aside');
  asideTags.each((i, el) => {
    if($(el).text().includes('Follow Us On…')) {
      $(el).replaceWith(asideReplace);
    }
  });

  console.log($('body').html());

  return (
    <div>{html}</div>
  )
}

export default temp;