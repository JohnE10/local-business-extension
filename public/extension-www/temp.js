chrome.storage.sync.get(['listings'], (result) => {
    console.log(result.listings);
})