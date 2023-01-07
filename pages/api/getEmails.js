export default async function handler(req, res) {

    // console.log('req: ', req);
    console.log('req.body.url: ', req.body.url)

    const response = await fetch(req.body.url);
    const data = await response.text();

    return res.status(200).send(data);










    // const urls = [
    //     'https://webtechagency.ca/',
    //     'https://360webfirm.ca/'
    // ];

    // let listOfEmails = [];
    // const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    // let pageContent = '';
    // let test = 'this is some text with an email address: john.ettoug@gmail.com and another:csworg@gmail.com'

    // urls.forEach(async (url, index) => {

    // let emailArr = [...pageContent.matchAll(emailRegEx)]

    //     // console.log('emailsArr[i][0] is: ', emailArr[i][0]);
    //     listOfEmails.push(emailArr[i][0]);
    //     // console.log(listOfEmails.length);
    //     if (index==((emailArr.length)-1)) {
    //         console.log('i=emailArr.length-1 listOfEmails is: ', listOfEmails);
    //     } 
    // }
    // for (const emailArr of [...pageContent.matchAll(emailRegEx)]) {
    // emailArr.forEach((email) => {
    //     if (!listOfEmails.includes(email[0])) {
    //         listOfEmails.push(email[0]);
    //         console.log(email[0]);
    //         console.log('first listOfEmails', listOfEmails);
    //     }
    // });

    // });


}



