

const thePage = () => {
    // get search keyword/phrase
    const searchStr = document.getElementsByClassName('fl');

    console.log('fl is:', searchStr);

    // declare variables
    let objArr = [];

    let index = 0;
    // let mainData = { name: '', url: '', email: '', phone: '', advertising: '', rating: '', reviews: '', industry: '', city: '', state: '', search: '' };

    // // search query
    // if (searchStr.length >= 1) {
    //     if (searchStr[0].getAttribute('href')) {
    //         // let page = searchStr[0].getAttribute('aria-label');
    //         // console.log('page is: ', page);
    //         search = searchStr[0].getAttribute('href');
    //         console.log('searh href is:', search);
    //         if (search.includes('&')) {
    //             search = search.split('&')[0];
    //             if (search.includes('search?q=')) {
    //                 if (search.split('search?q=')[1]) {
    //                     search = search.split('search?q=')[1];
    //                     search = decodeURIComponent(search);
    //                     search = search.replaceAll('+', ' ');
    //                     console.log('search is: ', search);
    //                 }
    //             }
    //         }
    //     }
    // }

    // search query
    // Get the <title> element
    const titleElement = document.head.querySelector('title');

    // Extract the innerHTML of the <title> element
    let titleInnerHTML = '';
    if(titleElement) {
            titleInnerHTML = titleElement.innerHTML;

    }

    // Print the innerHTML of the <title> element
    console.log('titleInnerHTML: ', titleInnerHTML);

    const search = titleInnerHTML.split('-')[0].trim();
    console.log('search: ', search);

    // check if document includes chat
    const documentText = document.documentElement.innerHTML;

    // get componay results block    

    const entities = document.querySelectorAll('.VkpGBb');


    // loop through block
    if (entities.length >= 1) {
        Array.from(entities).forEach((entity) => {
            let mainData = { id: '', name: 'no name', url: 'no url', page: 'no page', email: 'no email', phone: 'no phone', advertising: 'no advertising', chat: 'no chat', rating: 'no rating', reviews: 'no reviews', industry: 'no industry', city: 'no city', state: 'no state', search: 'no search' };

            if (documentText.includes('chat') || documentText.includes('livechat') || documentText.includes('chatbot')) {
                mainData['chat'] = 'Yes';
            }

            mainData['search'] = search;
            const name = entity.querySelector('.rllt__details .dbg0pd .OSrXXb'); // company name
            // agencyName = name.innerHTML;
            mainData['name'] = name.innerHTML;
            index = index + 1;
            mainData['id'] = index;
            // rating = entity.querySelector('.rllt__details .Y0A0hc .yi40Hd.YrbPuc'); // rating
            if (entity.querySelector('.rllt__details .Y0A0hc .yi40Hd.YrbPuc')) {
                const rating = entity.querySelector('.rllt__details .Y0A0hc .yi40Hd.YrbPuc'); // rating
                if (rating.innerHTML) {
                    mainData['rating'] = rating.innerHTML;
                    console.log('rating: ', mainData['rating']);
                }
            }

            if (entity.querySelector('.rllt__details .Y0A0hc .RDApEe.YrbPuc')) {
                let reviews = entity.querySelector('.rllt__details .Y0A0hc .RDApEe.YrbPuc'); // reviews
                if (reviews.innerHTML) {
                    reviews = reviews.innerHTML;
                    mainData['reviews'] = reviews.replaceAll('(', '').replaceAll(')', '');
                    console.log('reviews: ', mainData['reviews']);
                }

            }

            const anchors = entity.getElementsByTagName('a');  // anchors texts in block
            // console.log('anchors: ', anchors);
            if (anchors.length >= 1) {
                for (let i = 0; i < anchors.length; i++) {
                    if (anchors[i].getAttribute('class')) {
                        // console.log('anchors.getAttribute ran');

                        if (anchors[i].getAttribute('class') == 'yYlJEf Q7PwXb L48Cpd brKmxb') {  // anchor text class
                            console.log('anchors.getAttribute ran again');
                            const url = anchors[i].getAttribute('href'); // company site url
                            if (!url.includes('adurl')) {  // leave out the ads
                                // strip domain and update url field
                                const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/; // url regex
                                if (urlRegex.test(url)) {
                                    let temp = new URL(url);
                                    temp = temp.hostname;
                                    temp = temp.replace('www.', '');
                                    mainData['url'] = temp;
                                }

                                mainData['page'] = url;
                            }
                            else {
                                mainData['advertising'] = 'Yes';
                            }
                        }

                    }
                }
                objArr.push(mainData);
            }
        })
    }

    console.log('objArr is: ', objArr);

    // only run the fetch if there are listings
    if (objArr.length) {
        if (objArr.length > 0) {
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