
const handler = async (req, res) => {

    const puppeteer = require('puppeteer');

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
        // const element = await page.$('.oYWfcb.OSrXXb.RB2q5e');
        if (await page.$('.oYWfcb.OSrXXb.RB2q5e')) {
            await page.click('.oYWfcb.OSrXXb.RB2q5e');
        }
        else if (await page.$('a.jRKCUd')) {
            await page.click('a.jRKCUd');
        }
        else {
            throw Error('Page does not have a link to Google Places');
        }

        // if (element) {
        //     await page.click('.oYWfcb.OSrXXb.RB2q5e');
        // }
        // else {
        //     throw Error('Page does not have a link to Google Places');
        // }
    };

    // get listing details for div[jscontroller="xkZ6Lb"]
    const getListingDetails = async (page, search, city, state) => {
        await wait(2000);
        // await page.waitForNavigation();
        // check type of google source code
        if (await page.$('.VkpGBb')) {
            // if (await page.waitForSelector('.VkpGBb')) {

            // if(await page.$('.VkpGBb')) {
            // if(await page.$('div[jscontroller="AtSb"]')) {
            // if(document.querySelector('div[jscontroller="AtSb"]')) {
            await getListingDetails2(page, search, city, state);
            return;
        }

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

                    console.log(mainData);
                    return (mainData);

                }
            })
        });

        // set the value for search and push listings to listingArr
        listings.map((ele) => {
            ele['search'] = search.replaceAll('+', ' ') + ' ' + city.replaceAll('+', ' ') + ' ' + state.replaceAll('+', ' ');
            ele['city'] = city.replaceAll('+', ' ');
            ele['state'] = state.replaceAll('+', ' ');
            listingArr.push(ele);
        });

        console.log({ listings });

        return listings;

    };

    // get listing details for div[jscontroller="AtSb"]
    const getListingDetails2 = async (page, search, city, state) => {
        await wait(2000);
        // await page.waitForSelector('div[jscontroller="AtSb"]');
        await page.waitForSelector('.VkpGBb');



        const listings = await page.$$eval('.VkpGBb', (blocks) => {


            // const listings = await page.$$eval('.VkpGBb', (blocks) => {

            return blocks.map((ele, index) => {
                console.log('index:', index);

                let mainData = { id: '', name: 'no name', url: 'no url', page: 'no page', email: 'no email', phone: 'no phone', advertising: 'no advertising', chat: 'no chat', rating: 'no rating', reviews: 'no reviews', industry: 'no industry', city: 'no city', state: 'no state', search: 'no search' };

                // set element id
                mainData['id'] = index + 1;
                // get name
                if (ele.querySelector('.rllt__details .dbg0pd .OSrXXb') && ele.querySelector('.rllt__details .dbg0pd .OSrXXb').textContent) {

                    mainData['name'] = ele.querySelector('.rllt__details .dbg0pd .OSrXXb').textContent;

                    // get page, url and advertising
                    if (ele.querySelector('a.yYlJEf.Q7PwXb.L48Cpd.brKmxb') && ele.querySelector('a.yYlJEf.Q7PwXb.L48Cpd.brKmxb').getAttribute('href')) {

                        const tempUrl = ele.querySelector('a.yYlJEf.Q7PwXb.L48Cpd.brKmxb').getAttribute('href');

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

                    // get ratings 
                    if (ele.querySelector('.rllt__details .Y0A0hc .yi40Hd.YrbPuc')) {
                        if (ele.querySelector('.rllt__details .Y0A0hc .yi40Hd.YrbPuc').textContent) {
                            mainData['rating'] = ele.querySelector('.rllt__details .Y0A0hc .yi40Hd.YrbPuc').textContent;
                        }

                    }

                    // get reviews
                    if (ele.querySelector('.rllt__details .Y0A0hc .RDApEe.YrbPuc')) {
                        if (ele.querySelector('.rllt__details .Y0A0hc .RDApEe.YrbPuc').textContent) {
                            mainData['reviews'] = ele.querySelector('.rllt__details .Y0A0hc .RDApEe.YrbPuc').textContent.replace('(', '').replace(')', '');
                        }

                    }

                    console.log(mainData);
                    return (mainData);

                }
            })
        });

        // set the value for search and push listings to listingArr
        listings.map((ele) => {
            ele['search'] = search.replaceAll('+', ' ') + ' ' + city.replaceAll('+', ' ') + ' ' + state.replaceAll('+', ' ');
            ele['city'] = city.replaceAll('+', ' ');
            ele['state'] = state.replaceAll('+', ' ');
            listingArr.push(ele);
        });

        console.log({ listings });

        return listings;

    };

    // auto scroll function
    const autoScroll = async (page) => {
        // await page.waitForNavigation();
        await wait(2000);

        // check type of google source code
        if (await page.$('#center_col')) {
            await autoScroll2(page);
            return;
        }

        if (await page.$('.YhtaGd.aQOEkf')) {
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
        }
        else {
            throw Error("await page.$('.YhtaGd.aQOEkf') returned null");
        }


        // await page.waitForSelector('.YhtaGd.aQOEkf');
        // await page.evaluate(async () => {
        //     await new Promise((resolve) => {
        //         var totalHeight = 0;
        //         var distance = 200;
        //         var timer = setInterval(() => {
        //             var element = document.querySelectorAll('.YhtaGd.aQOEkf')[0];
        //             var scrollHeight = element.scrollHeight;
        //             totalHeight += distance;
        //             element.scrollBy(0, distance);
        //             if (totalHeight >= scrollHeight - window.innerHeight) {
        //                 clearInterval(timer);
        //                 resolve();
        //             }
        //         }, 100);
        //     });
        // });
    };

    // auto scroll function
    const autoScroll2 = async (page) => {
        await wait(2000);
        await page.waitForSelector('#center_col');
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                var totalHeight = 0;
                var distance = 200;
                var timer = setInterval(() => {
                    var element = document.querySelectorAll('#center_col')[0];
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

    // next page button
    const hasNextpage = async (page) => {
        await wait(2000);
        // check type of google source code
        if (await page.$('#pnnext')) {
            // await hasNextpage2(page);
            return true;
        }
        // check for Next button
        // const element = await page.$('button[aria-label="Suivant"]');
        if (await page.$('button[aria-label="Suivant"]')) {
            return true;
        }
        return false;
    };

    // // next page button (not being used currently, can be deleted)
    // const hasNextpage2 = async (page) => {
    //     // check for Next button
    //     if(await page.$('#pnnext')) {
    //         return true;
    //     }
    //     return false;
    // };

    // go to next page
    const goToNextpage = async (page) => {
        await wait(2000);
        // check type of google source code
        if (await page.$('#pnnext')) {
            page.click('#pnnext');
            // await goToNextpage2(page);
            return;
        }
        // click next button if it exists
        if (await hasNextpage(page)) {
            await page.click('button[aria-label="Suivant"]');
            // await page.waitForNetworkIdle();
            return;
        }
        return;
    };

    // // go to next page (not being used currently, can be deleted)
    // const goToNextpage2 = async (page) => {
    //     await wait(2000);
    //     // click next button if it exists
    //     if(await page.$('#pnnext')) {
    //         await page.click('#pnnext');
    //         return;
    //     }
    //     return;

    // };

    const sendDataToDB = async (objArr) => {
        const url = 'http://localhost:3000/api/storeInSandbox';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(objArr)
        });
        // setData(await response.json());
        // console.log('response is: ', response);
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

        // get city
        let city = req.query.city;
        city = city.trim().replaceAll(' ', '+');

        // get state
        let state = req.query.state;
        state = state.trim().replaceAll(' ', '+');

        let url = 'https://google.com';

        let endPoint = url;

        if (searchQuery) {
            endPoint = `${endPoint}/search?q=${searchQuery}+${city}+${state}`;
        }

        console.log({ endPoint });

        // launch Puppeteer browser and go to the specified url
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
            // args: ['--lang=bn-BD,bn']
        });
        const page = await browser.newPage();

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
            await getListingDetails(page, searchQuery, city, state);
            // const nextPageBoolean = await hasNextpage(page);
            // console.log({ nextPageBoolean });

            // await goToNextpage2(page);
            await goToNextpage(page);


            // } while (await hasNextpage2(page))
        } while (await hasNextpage(page))

        // get listing from the last page
        await autoScroll(page);
        await getListingDetails(page, searchQuery, city, state);

        console.log('Done');

        await browser.close();

        await sendDataToDB(listingArr);

        return res.status(200).json({ success: listingArr });

    } catch (error) {
        console.log('puppeteerIndexApi error:', error.message);
        // return res.status(200).json({ 'puppeteerIndexApi error': error.message });
    }

}

export default handler;