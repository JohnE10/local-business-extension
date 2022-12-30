// let FileSaver = require('file-saver');

// get search keyword/phrase
const searchStr = document.getElementsByClassName('fl');
let search;
let agencyName;
let agencyUrl;
let objArr = [];

// search query
if (searchStr.length >= 1) {
    if (searchStr[0].getAttribute('href')) {
        search = searchStr[0].getAttribute('href');
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
// console.log('entities length: ', entities.length);

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
                            agencyName = name.innerHTML;
                            agencyUrl = url;
                            console.log('Agency Name: ', agencyName);
                            console.log('Agency URL: ', agencyUrl);
                            console.log('--------------------');
                            objArr.push({ name: agencyName, url: agencyUrl, search: search });
                        }
                    }
                }
            }
        }
    })
}

console.log('objArr is: ', objArr);
console.log('objArr[0].name is: ', objArr[0].name);

console.log('This should log after objArr');

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
fetchData();

// const fetchUrl = `http://localhost:3000/?objArr=${JSON.stringify(objArr)}`;
// fetch(fetchUrl);


console.log('This should log after success message');

const str = 'some string from content';

// // store data for popup
// chrome.storage.local.set({objArr: JSON.stringify(objArr)});

// if (typeof window !== 'undefined') {
//     localStorage.setItem('objArr', JSON.stringify(objArr));
//   }

//   if (typeof window !== 'undefined') {
//     console.log('from local storage: ', localStorage.getItem('objArr'));
//   }