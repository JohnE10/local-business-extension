



const handler = async (req, res) => {

    const puppeteer = require('puppeteer');

    // go to google places
    const goToGooglePlaces = async (page) => {
        // click the "More Businesses" button
        await page.waitForSelector('.oYWfcb.OSrXXb.RB2q5e');
        await page.click('.oYWfcb.OSrXXb.RB2q5e');
    };

    // get listing details
    const getListingDetails = async (page) => {

        // // click the "More Businesses" button
        // await page.waitForSelector('.oYWfcb.OSrXXb.RB2q5e');
        // await page.click('.oYWfcb.OSrXXb.RB2q5e');

        await page.waitForSelector('div[jscontroller="xkZ6Lb"]');

        // console.log('waited for selector div[jscontroller="xkZ6Lb"]');

        const listings = await page.$$eval('div[jscontroller="xkZ6Lb"]', (blocks) => {

            return blocks.map((ele) => {
                let name = '';
                let url = '';

                if (ele.querySelector('.rgnuSb.xYjf2e') && ele.querySelector('.rgnuSb.xYjf2e').textContent) {
                    name = ele.querySelector('.rgnuSb.xYjf2e').textContent;
                    if (ele.querySelector('a div[jscontroller="CCRWHf"]') && ele.querySelector('a div[jscontroller="CCRWHf"]').getAttribute('data-website-url')) {
                        url = ele.querySelector('a div[jscontroller="CCRWHf"]').getAttribute('data-website-url');
                    }
                }

                console.log({ name, url });
                return ({ name, url });

            })
        });

        console.log({ listings });

        return listings;

    };

    // wait function
    const wait = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    // auto scroll function
    const autoScroll = async (page) => {
        await page.waitForSelector('.YhtaGd.aQOEkf');
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                var totalHeight = 0;
                var distance = 200;
                var timer = setInterval(() => {
                    var element = document.querySelectorAll('.YhtaGd.aQOEkf')[0];
                    var scrollHeight = element.scrollHeight;
                    totalHeight += distance;
                    element.scrollBy(0, distance);
                    if (totalHeight >= scrollHeight - window.innerHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    };

    // go to next page
    const goToNextpage = async (page) => {
        // click next button if it exists
        const element = await page.$('button[aria-label="Suivant"]');
        if(element) {
            await page.click('button[aria-label="Suivant"]');
            await page.waitForNetworkIdle();
            return true;
        }
        return false;

        // await page.waitForSelector('button[aria-label="Suivant"]');
        // await page.click('button[aria-label="Suivant"]');
    };


    try {

        // punctuation regex
        const punctuationRegEx = /[^\w\s]/g;
        let searchQuery = req.query.searchQuery;

        // remove punctuation, if there is any
        if (punctuationRegEx.test(searchQuery)) {
            searchQuery = searchQuery.replace(punctuationRegEx, "");
        }

        // get the search query from url parameter
        searchQuery = searchQuery.trim();
        searchQuery = searchQuery.replaceAll(' ', '+');

        let url = 'https://google.com';

        let endPoint = url;

        if (searchQuery) {
            endPoint = `${endPoint}/search?q=${searchQuery}`;
        }

        console.log({ endPoint });

        // launch Puppeteer browser and go to the specified url
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
            // args: ['--lang=bn-BD,bn']
        });
        const page = await browser.newPage();
        await page.setExtraHTTPHeaders({
            'Accept-Language': 'en'
        });
        await page.setViewport({
            width: 1300,
            height: 600
        })
        await page.goto(endPoint);

        // wait before moving on with code
        await wait(2000);

        // go to google places
        await goToGooglePlaces(page);

        

        // wait before moving on with code
        await wait(2000);

        // scroll to bottom of page
        await autoScroll(page);

        // wait before moving on with code
        await wait(2000);

        // parse listings
        let listings = [];
        listings = await getListingDetails(page);

        // wait before moving on with code
        await wait(2000);

        const nextPageBoolean = await goToNextpage(page);

        console.log({nextPageBoolean});

        // await browser.close();

        return res.status(200).json({ success: listings });

    } catch (error) {
        console.log('puppeteerIndexApi error:', error.message);
        return res.status(200).json({ 'puppeteerIndexApi error': error.message });
    }

}

export default handler;