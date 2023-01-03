
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('button1').addEventListener('click', () => {
        chrome.tabs.create({ url: "http://localhost:3000/show" });
    })

});