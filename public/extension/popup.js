

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('button1').addEventListener('click', () => {

        let newWindow = window.open('http://localhost:3000')
        newWindow.document.write('this is another window!');
    })

    // document.getElementById('button1').addEventListener('click', () => {
    //     // window.open('http://localhost:3000');
    //     chrome.storage.local.get("objArr", async (data) => {
    //         document.getElementById('businessData').innerHTML = data.objArr;
    //         // let temp = await data.objArr;
    //         // window.open(`http://localhost:3000/?objArr=${str}`);

    //     })
    // })
});