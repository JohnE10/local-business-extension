import { fileNameFromUrl, isValidUrl } from '/utils/helpers';
const path = require('path');


const temp = () => {

  const html = `
  <html>
  <body>
  <nav class="menu-top-container" aria-label="Menu">
  <ul id="menu-top" class="menu">
    <li
      class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-80">
      <a href="/index.html">HOME</a></li>
    <li
      class="menu-item menu-item-type-post_type menu-item-object-page menu-item-144">
      <a href="/our-team/index.html">OUR TEAM</a></li>
    <li
      class="menu-item menu-item-type-post_type menu-item-object-page menu-item-148">
      <a href="/contact-us/index.html">CONTACT US</a></li>
    <li
      class="menu-item menu-item-type-post_type menu-item-object-page menu-item-153">
      <a href="/patient-forms/index.html">PATIENT FORMS</a></li>
    <li
      class="menu-item menu-item-type-post_type menu-item-object-page menu-item-161">
      <a href="/procedures/index.html">PROCEDURES</a></li>
    <li
      class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-163 current_page_item menu-item-164">
      <a href="index.html" aria-current="page">INVISALIGN</a></li>
  </ul>
</nav>

<nav id="site-navigation" class="main-navigation" aria-label="Top Menu">
<button class="menu-toggle" aria-controls="top-menu" aria-expanded="false">
  <svg class="icon icon-bars" aria-hidden="true" role="img">
    <use href="#icon-bars" xlink:href="#icon-bars"></use>
  </svg><svg class="icon icon-close" aria-hidden="true" role="img">
    <use href="#icon-close" xlink:href="#icon-close"></use>
  </svg>Menu </button>

<div class="menu-top-container">
  <ul id="top-menu" class="menu">
    <li id="menu-item-80"
      class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-80">
      <a href="/index.html">HOME</a></li>
    <li id="menu-item-144"
      class="menu-item menu-item-type-post_type menu-item-object-page menu-item-144"><a
        href="/our-team/index.html">OUR TEAM</a></li>
    <li id="menu-item-148"
      class="menu-item menu-item-type-post_type menu-item-object-page menu-item-148"><a
        href="/contact-us/index.html">CONTACT US</a></li>
    <li id="menu-item-153"
      class="menu-item menu-item-type-post_type menu-item-object-page menu-item-153"><a
        href="/patient-forms/index.html">PATIENT FORMS</a></li>
    <li id="menu-item-161"
      class="menu-item menu-item-type-post_type menu-item-object-page menu-item-161"><a
        href="/procedures/index.html">PROCEDURES</a></li>
    <li id="menu-item-164"
      class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-163 current_page_item menu-item-164">
      <a href="index.html" aria-current="page">INVISALIGN</a></li>
  </ul>
</div>
</nav>
</body>
</html>
  `
  ;

  const cheerio = require('cheerio');

  let $ = cheerio.load(html);

  let navLinks = $('body').find('nav').find('li').find('a');

  // const url = '/index.html';

  // const temp = fileNameFromUrl(url);

  // console.log(temp);


  return (
    <div>temp</div>
  )
}

export default temp;