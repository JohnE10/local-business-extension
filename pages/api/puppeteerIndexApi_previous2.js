
const handler = async (req, res) => {

    const puppeteer = require('puppeteer');

    let i = 0;

    // listing array
    let listingArr = [];

    // wait function
    const wait = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    // go to google places
    const goToGooglePlaces = async (page) => {
        await wait(2000);
        // click the "More Businesses" button
        const element = await page.$('.oYWfcb.OSrXXb.RB2q5e');

        if (element) {
            await page.click('.oYWfcb.OSrXXb.RB2q5e');
        }
        else {
            throw Error('Page does not have a link to Google Places');
        }

        // await page.waitForSelector('.oYWfcb.OSrXXb.RB2q5e');
        // await page.click('.oYWfcb.OSrXXb.RB2q5e');
    };

    // get listing details
    const getListingDetails = async (page, search, city, state) => {
        await wait(2000);
        await page.waitForSelector('div[jscontroller="xkZ6Lb"]');

        // console.log('waited for selector div[jscontroller="xkZ6Lb"]');

        const listings = await page.$$eval('div[jscontroller="xkZ6Lb"]', (blocks) => {

            return blocks.map((ele, index) => {
                let mainData = { id: '', name: 'no name', url: 'no url', page: 'no page', email: 'no email', phone: 'no phone', advertising: 'no advertising', chat: 'no chat', rating: 'no rating', reviews: 'no reviews', industry: 'no industry', city: 'no city', state: 'no state', search: 'no search' };

                // set element id
                mainData['id'] = index + 1;
                // get name
                if (ele.querySelector('.deyx8d .rgnuSb.xYjf2e') && ele.querySelector('.deyx8d .rgnuSb.xYjf2e').textContent) {

                    mainData['name'] = ele.querySelector('.rgnuSb.xYjf2e').textContent;

                    // get page, url and advertising
                    if (ele.querySelector('a div[jscontroller="CCRWHf"]') && ele.querySelector('a div[jscontroller="CCRWHf"]').getAttribute('data-website-url')) {

                        const tempUrl = ele.querySelector('a div[jscontroller="CCRWHf"]').getAttribute('data-website-url');

                        if (!tempUrl.includes('adurl')) {  // leave out the ads
                            // strip domain and update url field
                            const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/; // url regex
                            if (urlRegex.test(tempUrl)) {
                                let tempUrl2 = new URL(tempUrl);
                                tempUrl2 = tempUrl2.hostname;
                                tempUrl2 = tempUrl2.replace('www.', '');
                                mainData['url'] = tempUrl2;
                            }

                            mainData['page'] = tempUrl;
                        }
                        else {
                            mainData['advertising'] = 'Yes';
                        }
                    }

                    // get ratings and reviews
                    if (ele.querySelector('.deyx8d .rGaJuf') && ele.querySelector('.deyx8d .rGaJuf').textContent) {
                        mainData['rating'] = ele.querySelector('.deyx8d .rGaJuf').textContent;

                    }

                    // get reviews
                    if (ele.querySelector('.deyx8d .leIgTe') && ele.querySelector('.deyx8d .leIgTe').textContent) {
                        mainData['reviews'] = ele.querySelector('.deyx8d .leIgTe').textContent.replace('(', '').replace(')', '');
                    }

                    // console.log(mainData);
                    return (mainData);

                }
            })
        });

        // set the value for search, city and state, and push listings to listingArr
        listings.map((ele) => {
            ele['search'] = search.replaceAll('+', ' ');
            ele['city'] = city;
            ele['state'] = state;
            listingArr.push(ele)
        });

        // console.log({ listings });

        return listings;

    };

    // auto scroll function
    const autoScroll = async (page) => {
        await wait(2000);
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

    const hasNextpage = async (page) => {
        // check for Next button
        const element = await page.$('button[aria-label="Suivant"]');
        if (element) {
            return true;
        }
        return false;
    };

    // go to next page
    const goToNextpage = async (page) => {
        await wait(2000);
        // click next button if it exists
        // const element = await page.$('button[aria-label="Suivant"]');
        if (await hasNextpage(page)) {
            await page.click('button[aria-label="Suivant"]');
            // await page.waitForNetworkIdle();
        }

        // await page.waitForSelector('button[aria-label="Suivant"]');
        // await page.click('button[aria-label="Suivant"]');
    };


    try {

        // punctuation regex
        const punctuationRegEx = /[^\w\s]/g;
        let searchQuery = req.query.searchQuery;
        // const city = req.query.city;
        let cities = req.query.cities;
        cities = JSON.parse(cities);
        const state = req.query.state;

        const cityCount = cities.length;
        // const cityCount = req.query.cityCount;

        console.log({cities, cityCount});



        // remove punctuation, if there is any
        if (punctuationRegEx.test(searchQuery)) {
            searchQuery = searchQuery.replace(punctuationRegEx, "");
        }

        // get the search query from url parameter
        searchQuery = searchQuery.trim();
        searchQuery = searchQuery.replaceAll(' ', '+');

        let url = 'https://google.com';

        let endPoint = url;

        const fullSearchQuery = `${searchQuery}+${cities[i]}+${state}`;
        // const fullSearchQuery = `${searchQuery}+${city}+${state}`;

        if (fullSearchQuery) {
            endPoint = `${endPoint}/search?q=${fullSearchQuery}`;
        }

        console.log({ endPoint });

        let browser;

        try {
            browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
            // If the connection is successful, it means a browser is already open
            console.log('Browser is already open.');

            // Perform any actions you need with the existing browser instance

        } catch (error) {
            // If the connection fails, it means no browser instance is open
            console.log('No browser open. Launching a new one...');
            browser = await puppeteer.launch({
                headless: false,
                executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
                // args: ['--lang=bn-BD,bn']
            });

            // Perform any actions you need with the newly launched browser instance
        }

        // // launch Puppeteer browser and go to the specified url
        // browser = await puppeteer.launch({
        //     headless: false,
        //     executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        //     // args: ['--lang=bn-BD,bn']
        // });

        const page = await browser.newPage();

        // await page.setExtraHTTPHeaders({
        //     'Accept-Language': 'en'
        // });

        await page.setViewport({
            width: 1300,
            height: 600
        })
        // await page.goto(endPoint);
        await page.goto(endPoint, {
            waitUntil: "domcontentloaded"
        });

        await goToGooglePlaces(page);

        do {

            // run the app
            await autoScroll(page);
            // let listings = [];
            // listings = await getListingDetails(page, searchQuery);
            await getListingDetails(page, searchQuery, cities[i], state);
            const nextPageBoolean = await hasNextpage(page);
            console.log({ nextPageBoolean });

            await goToNextpage(page);

        } while (await hasNextpage(page))

        // get listing from the last page
        await autoScroll(page);
        await getListingDetails(page, searchQuery, cities[i], state);

        console.log(`${searchQuery} ${cities[i]} ${state} done`);

        i++;
        console.log({ i });

        if (i >= 1) {
            console.log('more to go');
        }

        await browser.close();

        return res.status(200).json({ success: listingArr });

    } catch (error) {
        console.log('puppeteerIndexApi error:', error.message);
        return res.status(200).json({ 'puppeteerIndexApi error': error.message });
    }

}

export default handler;