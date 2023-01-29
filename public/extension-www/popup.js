let response = [];
// let responseLength = response.length;

// (async () => {
//     const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//     response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
//     // do something with response here, not outside the function
//     // console.log(response);
//   })();

document.addEventListener('DOMContentLoaded', () => {

    (async () => {
        let tempInner = '';

        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        response = await chrome.tabs.sendMessage(tab.id, { greeting: "hello" });
        console.log('response is: ', response);
        let urls = [];
        for (let i=0; i<response.length; i++) {
            let url = 'https://www.google.com' + response[i].uri
            tempInner = `<a id="inner` + (i+2) + `" href='` + url + `' target= _blank>` + response[i].page + '</a>';
            urls.push(tempInner);
        }
        console.log(urls);

        let inner = '';
        for (let i=0; i<urls.length; i++) {
            inner = inner + urls[i] + '<br />';
        }

        console.log('inner is: ', inner);

        document.getElementById('nextPages').innerHTML = `<div>${inner}</div>`;

    })();

    document.getElementById('button1').addEventListener('click', () => {
        chrome.tabs.create({ url: "http://localhost:3000/show" });
    })

    document.getElementById('button2').addEventListener('click', () => {
        chrome.tabs.create({ url: "http://localhost:3000/show" });
    })

    for (let i=0; i<response.length; i++) {
        let id = `inner${i+2}`;
        let page = document.getElementById(id)[0].getAttribute('href');
        console.log('page is: ', page);
        document.getElementById(id).addEventListener('click', () => {
            if (response[i].index == (i+2)) {
                chrome.tabs.create({ url: page });
            }
            
        })
    }
});