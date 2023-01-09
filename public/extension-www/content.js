

const thePage = () => {
    // get search keyword/phrase
    const searchStr = document.getElementsByClassName('fl');

    console.log('fl is:', searchStr);

    // declare variables
    let search;
    let agencyName;
    let agencyUrl;
    let objArr = [];
    let index = 0;


    // search query
    if (searchStr.length >= 1) {
        if (searchStr[0].getAttribute('href')) {
            // let page = searchStr[0].getAttribute('aria-label');
            // console.log('page is: ', page);
            search = searchStr[0].getAttribute('href');
            console.log('searh href is:', search);
            if (search.includes('&')) {
                search = search.split('&')[0];
                if (search.includes('search?q=')) {
                    if (search.split('search?q=')[1]) {
                        search = search.split('search?q=')[1];
                        search = decodeURIComponent(search);
                        search = search.replaceAll('+', ' ');
                        console.log('search is: ', search);
                    }
                }
            }
        }
    }

    // get componay results block    

    const entities = document.querySelectorAll('.VkpGBb');

    // loop through block
    if (entities.length >= 1) {
        Array.from(entities).forEach((entity) => {
            const name = entity.querySelector('.rllt__details .dbg0pd .OSrXXb'); // company name

            const anchors = entity.getElementsByTagName('a');  // anchors texts in block
            if (anchors.length >= 1) {
                for (let i = 0; i < anchors.length; i++) {
                    if (anchors[i].getAttribute('class')) {
                        if (anchors[i].getAttribute('class') == 'yYlJEf Q7PwXb L48Cpd') {  // anchor text class
                            const url = anchors[i].getAttribute('href'); // company site url
                            if (!url.includes('adurl')) {  // leave out the ads
                                index = index + 1;
                                agencyName = name.innerHTML;
                                agencyUrl = url;
                                objArr.push({ id: index, name: agencyName, url: agencyUrl, search: search });
                            }
                        }
                    }
                }
            }
        })
    }

    console.log('objArr is: ', objArr);

    for (let i = 0; i < objArr.length; i++) {
        console.log(objArr[i].url);
    }


    // post data to backend to be stored in database
    const fetchUrl = `http://localhost:3000/api/storeData`;
    const fetchData = async () => {
        const response = await fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(objArr)
        });

        const data = await response.json();
        console.log('data is: ', data);
    }

    // only run the fetch if there are listings
    if (objArr.length) {
        console.log('objArr after the if(objArr.length');
        if (objArr.length > 0) {
            console.log('objArr after the if(objArr.length>0');
            fetchData();
            chrome.storage.sync.set({ 'listings': objArr }); // store listings in chrome storage
        }
    }

    // get listings from chrome storage and set them in local storage for the "show" page 
    chrome.storage.sync.get(['listings'], (result) => {
        localStorage.setItem('listings', JSON.stringify(result.listings));
    });
}

thePage();

chrome.runtime.onMessage.addListener(

    function (request, sender, sendResponse) {
        thePage();
        let nextUrls = [];
        // const searchStr = document.getElementsByClassName('fl');

        const searchStr = document.getElementsByClassName('fl')


        for (let i = 0; i < searchStr.length; i++) {
            if (searchStr[i].getAttribute('aria-label')) {
                nextUrls.push({ uri: searchStr[i].getAttribute('href'), page: searchStr[i].getAttribute('aria-label'), index: (i + 2) });
            }
        }

        console.log('nextUrls is: ', nextUrls);

        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        if (request.greeting === "hello")
            sendResponse(nextUrls);

        if (request.greeting === "set storage")
            sendResponse('set storage completed');

    }
); 