



const handler = async (req, res) => {

    const puppeteer = require('puppeteer');

    // wait function
    const wait = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    // auto scroll function
    const autoScroll = async (page) => {
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                var totalHeight = 0;
                var distance = 200;
                var timer = setInterval(() => {
                    var element = document.querySelectorAll('.YhtaGd.aQOEkf')[0];
                    varscrollHeight = element.scrollHeight;
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

    // get listing details
    const getListingDetails = async (page) => {

        // console.log('getListingDetails ran');

        // click the "More Businesses" button
        await page.waitForSelector('.oYWfcb.OSrXXb.RB2q5e');
        await page.click('.oYWfcb.OSrXXb.RB2q5e');

        await page.waitForSelector('div[jscontroller="xkZ6Lb"]');

        // console.log('waited for selector div[jscontroller="xkZ6Lb"]');

        const listings = await page.$$eval('div[jscontroller="xkZ6Lb"]', (blocks) => {
            console.log('listings callback ran');
            return blocks.map(async (ele) => {
                let name = '';
                let url = '';

                await page.waitForSelector('.rgnuSb.xYjf2e');

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
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
        });
        const page = await browser.newPage();
        await page.goto(endPoint);

        // console.log({page})

        //  await wait(1000);

        // parse listings
        let listings = [];
        listings = await getListingDetails(page);

        console.log('listings2', listings);

        // // wait before moving on with code
        // await wait(1000);

        // // scroll to bottom of page
        // await autoScroll(page);

        // await browser.close();


        return res.status(200).json({ success: listings });


    } catch (error) {
        console.log('puppeteerIndexApi error:', error.message);
        return res.status(200).json({ 'puppeteerIndexApi error': error.message });
    }

}

export default handler;