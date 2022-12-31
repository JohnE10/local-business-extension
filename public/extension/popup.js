
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('button1').addEventListener('click', () => {

        function toLocalStorage() {
            chrome.storage.sync.get('listings').then((result) => {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('listings', JSON.stringify(result.listings));
                }
            })
        }

        chrome.tabs.create({ url: "http://localhost:3000" }, (x) => {
            chrome.tabs.onUpdated.addListener(function _(tabId, info, tab) {
                chrome.scripting.executeScript(
                    {
                        target: { tabId },
                        func: toLocalStorage,
                    },
                    () => { });
            });
        });
    })

});