

try {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete') {
            chrome.storage.sync.get(['syncStorage']).then((result) => {
                console.log('value is: ', result.syncStorage);
            
                
            })
        }
    })
} catch (err) {
    console.log(e);
}





