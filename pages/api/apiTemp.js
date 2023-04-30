import axios from 'axios';
import cheerio from 'cheerio';
import { promises as fs } from 'fs';

export default function PageScraper(req, res) {
  async function scrapeWebsite(url) {
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const links = $('a[href]').map((i, el) => $(el).attr('href')).get();
    
    const htmls = await Promise.all(links.map(async (link) => {
      try {
        const { data: pageHtml } = await axios.get(link);
        const $page = cheerio.load(pageHtml);
        return $page.html();
      } catch (err) {
        console.error(err);
        return null;
      }
    }));
    
    return htmls.filter(Boolean);
  }

  async function handleScrape() {
    const websiteUrl = 'https://www.cbddentalcare.com/';
    const htmls = await scrapeWebsite(websiteUrl);

    await Promise.all(htmls.map(async (html, i) => {
      await fs.writeFile(`public/rebuiltSites/first/page-${i}.html`, html);
    }));
    res.send('Done');
  }
  handleScrape();

}
