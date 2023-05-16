
const temp = () => {

  const cheerio = require('cheerio');

let html =  `<html><script src="https://www.midcitysmiles.com/blog/wp-content/themes/twentyseventeen/assets/js/skip-link-focus-fix.js?ver=20161114" id="twentyseventeen-skip-link-focus-fix-js">some text</script></html>`;

let $ = cheerio.load(html);

console.log($('style').text());



// const scriptRegex = /<script([^>]*)<\/script>/g;;
// // str = str.replaceAll(scriptRegex, '<script$1>{`$1`}</script>');
// str = str.replaceAll(scriptRegex, 'Text');



  

  return (
    <div>temp</div>
  )
}

export default temp;