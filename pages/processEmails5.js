import { selectedGridRowsCountSelector } from "@mui/x-data-grid";
import { set } from "mongoose";
import { useEffect, useState } from "react";
import EmailListTable from '../components/EmailListTable';
import { isValidUrl } from '../utils/helpers';
import { handleClientScriptLoad } from 'next/script';


const ProcessEmails4 = () => {

    // declare variables
    const [pageContent, setPageContent] = useState([]);
    const [contactPageContent, setContactPageContent] = useState([]);
    const [emailList, setEmailList] = useState([]);
    const [contactEmailList, setContactEmailList] = useState([]);
    const [contactUrls, setContactUrls] = useState([]);
    const [checkContact, setCheckContact] = useState([]);
    const [noEmailList, setNoEmailList] = useState([]);
    const [error, setError] = useState(null);
    const [textArea, setTextArea] = useState('');
    const [urls, setUrls] = useState(null);
    const [isWorking, setIsWorking] = useState(false);
    const [startPageContent, setStartPageContent] = useState(false);
    const [startContactPageContent, setStartContactPageContent] = useState(false);
    const [startSendData, setStartSendData] = useState(false);
    const [comboArr, setComboArr] = useState([]);
    const [startComboArr, setStartComboArr] = useState(false);

    const cheerio = require('cheerio');

    let counter1 = 0;
    let counter2 = 0;

   // keep emails unique
   let uniqueEmails = [];

    const handleClick = (e) => {

        if (textArea != '') {
            setStartPageContent(false);
            setStartContactPageContent(false);
            setStartSendData(false);
            setEmailList([]);
            setContactEmailList([]);
            setIsWorking(true);
            setUrls(textArea.split('\n'));
        }
    }

    const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

    // let getEmailsCounter = 0;
    let i = 0;
    const getEmails = async (urls, i) => {
        console.log('getEmails() ran');
        console.log({ urls });
        try {

            console.log({ i })
            const url = urls[i];
            console.log('url: ', urls[i]);
            if (isValidUrl(urls[i])) {

                const endPoint =  `/api/lib/helpers/fetchUrlData?url=${url}`;
                // const endPoint =  `/api/lib/helpers/fetchUrlData?url=${urls[i]}`;
                const results = await getFetchData(endPoint);
                // console.log({results});

                if (results) {
                    setPageContent((old) => [...old, { url: url, data: results }]);
                    // setPageContent((old) => [...old, { url: urls[i], data: results }]);
                    // console.log({results});
                }
                i++;

                if (i < urls.length) {
                    getEmails(urls, i);
                }
                else {
                    setStartPageContent(true);
                    console.log('getEmails() done');

                }
            }

        } catch (error) {
            console.log('getEmails() error:', urls[i] + ' - ' + error.message);
        }

    };

    // get a list of emails and a list of urls where no email was found

    const unwantedExtensionsdArr = ['jpg', 'jpeg', 'png']; // unwanted file extensions
    const leaveOut = ['email.com', 'mail.com']; // unwanted email TLDs

    // extract emails from initisl landing page
    const handlePageContent = (pageContent) => {
        // console.log('handlePageContent() ran');
        if (pageContent.length > 0) {

            pageContent.map((ele) => {
                let strippedUrl = stripDomain(ele.url); // strip url to host name
                // console.log({pageContent});
                const tempArr = [...ele.data.matchAll(emailRegEx)]; // get all email addresses in page
                // if url has no email, then stick it in the checkContact array to see if there's an email in the contact page
                if (tempArr.length == 0) {
                    if (!checkContact.map(a => a.url).includes(ele.url)) {  // no dupes
                        checkContact.push({ url: ele.url, data: ele.data });

                        // HTML parser
                        let $ = cheerio.load(ele.data);

                        // Get all a tags;
                        let aTags = $('body').find('a');

                        for (let i = 0; i < aTags.length; i++) {
                            aTags.map(async (aTag) => {
                                if (aTag.innerHTML) {

                                    // if the a tags is for contact or "get in touch" page then push it href attribute to an array
                                    if (aTags[i].innerHTML.toLowerCase().includes('contact') || aTags[i].innerHTML.toLowerCase().includes('get in touch')) {
                                        if (!contactUrls.map(a => a.contactUrl).includes(aTag.getAttribute('href'))) { // check for dupes
                                            contactUrls.push({ url: ele.url, contactUrl: aTag.getAttribute('href') })

                                            if (isValidUrl(aTag.getAttribute('href'))) {

                                                const endPoint = `/api/lib/helpers/fetchUrlData?url=${aTag.getAttribute('href')}`;
                                                const results = await getFetchData(endPoint);
                                                console.log('results: ', results);

                                                if (results) {
                                                    setPageContent((old) => [...old, { url: aTag.getAttribute('href'), data: results }]);
                                                }
                                            }

                                        }
                                    }
                                }
                            });
                        }
                    }
                } else {
                    // if an email is found, then stick it in the emailList array
                    for (let i = 0; i < tempArr.length; i++) {

                        if (!emailList.map(a => a.email).includes(tempArr[i][0]) && !tempArr[i][0].includes('/') && !tempArr[i][0].includes("'")) { // no dupes and no junk 

                            const fileExtension = tempArr[i][0].split('.').pop(); // 
                            const emailTLD = tempArr[i][0].split('@').pop();


                            // check for unwanted file extensions and email TLDs
                            if (!unwantedExtensionsdArr.includes(fileExtension) && !leaveOut.includes(emailTLD) && !uniqueEmails.includes(tempArr[i][0])) {
                                uniqueEmails.push(tempArr[i][0]);
                                setEmailList((old) => [...old, { url: strippedUrl, email: tempArr[i][0] }]); // add to list
                                // emailList.push({ url: strippedUrl, email: tempArr[i][0] }); // add to list
                            }
                        }
                    }
                }

            })
            setStartContactPageContent(true);

        }
    };

    // extract emails from the contact page urls
    const handleContactPageContent = () => {
        console.log('handleContactPageContent() ran');

        if (contactPageContent.length > 0) {
            contactPageContent.map((ele) => {
                let strippedUrl = stripDomain(ele.url); // strip url to host name
                const tempArr = [...ele.data.matchAll(emailRegEx)]; // get all email addresses in page
                // if an email is found, then stick it in the contactEmailList array
                if (tempArr.length != 0) {
                    for (let i = 0; i < tempArr.length; i++) {
                        if (!contactEmailList.map(a => a.email).includes(tempArr[i][0]) && !tempArr[i][0].includes('/') && !tempArr[i][0].includes("'")) { // no dupes and no junk 

                            const fileExtension = tempArr[i][0].split('.').pop(); // 
                            const emailTLD = tempArr[i][0].split('@').pop();

                            // check for unwanted file extensions and email TLDs
                            if (!unwantedExtensionsdArr.includes(fileExtension) && !leaveOut.includes(emailTLD) && !uniqueEmails.includes(tempArr[i][0])) {
                                uniqueEmails.push(tempArr[i][0]);
                                setContactEmailList((old), [...old, { url: strippedUrl, email: tempArr[i][0] }]); // add to list // add to list
                                // contactEmailList.push({ url: strippedUrl, email: tempArr[i][0] }); // add to list // add to list
                            }

                        }
                    }
                } else {
                    if (strippedUrl) {
                        if (!noEmailList.includes(strippedUrl)) {
                            noEmailList.push(strippedUrl);
                        }
                    }
                }

            })

        }

        setStartComboArr(true);
    };

    // comboArr = [...emailList, ...contactEmailList];

    // send email data to be stored in database
    const sendData = async (dataObj) => {
        console.log('sendData() ran');
        const fetchUrl = 'http://localhost:3000/api/storeData5';
        // const fetchUrl = 'http://localhost:3000/api/storeData4';
        // const fetchUrl = `http://localhost:3000/api/storeData3`;
        // const fetchUrl = `http://localhost:3000/api/storeData2`;
        const response = await fetch(fetchUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dataObj)
        });

    };


    useEffect(() => {
        if (urls) {
            getEmails(urls, i);
            // getEmails(urls, getEmailsCounter);
        }

    }, [urls]);

    useEffect(() => {
        if (startPageContent) {
            handlePageContent(pageContent);
            // console.log({emailList});
        }
    }, [startPageContent]);

    useEffect(() => {
        if (startContactPageContent) {
            handleContactPageContent(contactPageContent);
        }
    }, [startContactPageContent]);

    useEffect(() => {
        if (startComboArr) {
            setComboArr([...emailList, ...contactEmailList]);
            setStartSendData(true);
        }
    }, [startComboArr]);

    useEffect(() => {
        if (startSendData) {
            sendData(comboArr);
            console.log({ comboArr });
            setIsWorking(false);
        }
    }, [startSendData]);



    return (

        <div>

            <div className='text-center'>
                <label className='w-100 fw-bold mb-1'>Paste URLs:</label>
                {/* <textarea className='w-50' rows={6} */}
                <textarea
                    value={textArea}
                    placeholder='Paste your urls here...'
                    onChange={(e) => setTextArea(e.target.value)}
                />
                <div className='w100 m-3'>
                    <button onClick={handleClick}>Submit</button>
                </div>

            </div>

            {comboArr.length > 0 && <h4 className='text-center m-3'>Email List</h4>}

            {comboArr.length > 0 &&
                <div className='text-center'>
                    <h5 className='text-center mb-3'>Count: {comboArr.length}</h5>
                    {comboArr.map((email, i) => (
                        <div key={i}>{email.url} - {email.email}</div>
                        // <div key={i}>{email.email}</div>
                    ))}
                </div>
            }
        </div>
    );
}

export default ProcessEmails4;

export const getFetchData = async (endPoint) => {

    const response = await fetch(endPoint);
    const results = await response.json();

    // console.log('getFetchData() results:', results);

    if (results.success) {
        const data = results.success;
        return data;
    }
    else if (results.error) {
        return results.error;
    }

};

// strip url to just domain
export const stripDomain = (url) => {
    if (isValidUrl(url)) {
        let domain = new URL(url);
        url = domain.hostname;
        url = url.replace('www.', '');

        return url;
    }
};
