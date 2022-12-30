try{
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete') {
            chrome.scripting.excecuteScript({
                files: ['injectStorageInfo.js'],
                target: {tabId: tab.id}
            });
        }
    })
} catch(err) {
    console.log(e);
}



