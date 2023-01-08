import { set } from "mongoose";
import { useEffect, useState } from "react";
import EmailListTable from "../components/EmailListTable";

const processEmails = () => {

    // declare helper functions
    // strip url to host name
    const stripDomain = (url) => {
        let domain = new URL(url);
        url = domain.hostname;

        if (url.includes('www.')) {
            url = url.replace('www.', '');
        }
        return url;
    }

    // fetch data from next api
    const runFetch = async (urls) => {
        const pageContent = [];
        urls.forEach((url) => {
            const fetchData = async () => {
                const response = await fetch('http://localhost:3000/api/getEmails', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ url: url })
                });
                const data = await response.text();
                // setPageContent((pageContent) => [...pageContent, { url: url, data: data }]);
                pageContent.push[{ url: url, data: data }];

            }
            fetchData();

        });
        return pageContent;
    };

    // declare variables
    const [pageContent, setPageContent] = useState([]);
    const [contactPageContent, setContactPageContent] = useState([]);
    const [emailList, setEmailList] = useState([]);
    const [contactEmailList, setContactEmailList] = useState([]);
    const [contactUrls, setContactUrls] = useState([]);
    const [checkContact, setCheckContact] = useState([]);
    const [noEmailList, setNoEmailList] = useState([]);
    const [error, setError] = useState(null);

    // urls to scrape
    const urls = [
        'https://endoh.co/',
        'http://www.studioweb.com/',
        'https://catalystdv.com/',
        'https://lafirme.quebec/',
        'http://www.aliengirl.xyz/',
        'https://www.sidekickinteractive.com/',
        'http://www.blackduckagency.com/',
        'https://monolith.agency/',
        'https://www.appnovation.com/',
        'http://www.mh.ca/',
        'http://www.mezoweb.com/',
        'http://field-office.ca/',
        'https://www.azrawweb.com/',
        'https://vibetech.org/',
        'http://www.walterinteractive.com/',
        'https://www.capermint.com/',
        'https://www.malopan.com/',
    ];

    const emailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

    // fetch page content
    useEffect(() => {
        urls.forEach((url) => {
            const fetchData = async () => {
                const response = await fetch('http://localhost:3000/api/getEmails', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ url: url })
                });
                const data = await response.text();
                setPageContent((pageContent) => [...pageContent, { url: url, data: data }]);

            }
            fetchData();
        });
    }, []);



    // get a list of emails and a list of urls where no email was found
    if (pageContent.length > 0) {

        pageContent.map((ele) => {
            let strippedUrl = stripDomain(ele.url); // strip url to host name
            const tempArr = [...ele.data.matchAll(emailRegEx)]; // get all email addresses in page
            // if url has no email, then stick it in the checkContact array to see if there's an email in the contact page
            if (tempArr.length == 0) {
                if (!checkContact.map(a => a.url).includes(ele.url)) {  // no dupes
                    checkContact.push({ url: ele.url, data: ele.data });
                    const htmlDom = new DOMParser().parseFromString(ele.data, 'text/html'); // convert string into html dom
                    const aTags = htmlDom.getElementsByTagName('a'); // get all the a tags
                    for (let i = 0; i < aTags.length; i++) {
                        if (aTags[i].innerHTML) {
                            // if the a tags is for contact of "get in touch" page then push it href attribute to an array
                            if (aTags[i].innerHTML.toLowerCase().includes('contact') || aTags[i].innerHTML.toLowerCase().includes('get in touch')) {
                                if (!contactUrls.map(a => a.contactUrl).includes(aTags[i].getAttribute('href'))) { // check for dupes
                                    contactUrls.push({ url: ele.url, contactUrl: aTags[i].getAttribute('href') })
                                    const fetchData = async (url) => {
                                        const response = await fetch('http://localhost:3000/api/getEmails', {
                                            method: 'POST',
                                            headers: {
                                                'content-type': 'application/json',
                                            },
                                            body: JSON.stringify({ url: url })
                                        });
                                        const data = await response.text();
                                        setContactPageContent((contactPageContent) => [...contactPageContent, { url: url, data: data }]);

                                    }
                                    fetchData(aTags[i].getAttribute('href'));
                                }
                            }
                        }
                    }
                }
            } else {
                // if an email is found, then stick it in the emailList array
                for (let i = 0; i < tempArr.length; i++) {

                    if (!emailList.map(a => a.email).includes(tempArr[i][0]) && !tempArr[i][0].includes('/')) { // no dupes and no junk 
                        if (tempArr[i][0].substr(tempArr[i][0].length - 4) != '.png') { // remove any www.
                            emailList.push({ url: strippedUrl, email: tempArr[i][0] }); // add to list
                        }
                    }
                }
            }
        })

    }

    // extract emails from the contact page urls
    if (contactPageContent.length > 0) {
        contactPageContent.map((ele) => {
            let strippedUrl = stripDomain(ele.url); // strip url to host name
            const tempArr = [...ele.data.matchAll(emailRegEx)]; // get all email addresses in page
            // if an email is found, then stick it in the contactEmailList array
            if (tempArr.length != 0) {
                for (let i = 0; i < tempArr.length; i++) {
                    if (!contactEmailList.map(a => a.email).includes(tempArr[i][0]) && !tempArr[i][0].includes('/')) { // no dupes and no junk 
                        if (tempArr[i][0].substr(tempArr[i][0].length - 4) != '.png') { // remove any www.
                            contactEmailList.push({ url: strippedUrl, email: tempArr[i][0] }); // add to list
                        }
                    }
                }
            }
        })
    }

    console.log('contactPageContent: ', contactPageContent);

    console.log('emailList is: ', emailList);
    console.log('checkContact is: ', checkContact);
    console.log('contactUrls is: ', contactUrls);
    console.log('contactEmailList', contactEmailList);

    return (

        <div>
            <h2 className='text-center my-4'>Email List</h2>
            <div className="container w-75">
                {error && <h3 className='text-danger text-center'>Error: {error}</h3>}
                {
                    emailList &&
                    <div>
                        {emailList.map((email, i) => (
                            <div key={i}>{email.email}</div>
                        ))}
                        <div>Count is: {emailList.length}</div>
                    </div>

                }
            </div>
            <h2 className='text-center my-4'>Contact Email List</h2>
            <div className="container w-75">
                {error && <h3 className='text-danger text-center'>Error: {error}</h3>}
                {
                    contactEmailList &&
                    <div>
                        {contactEmailList.map((email, i) => (
                            <div key={i}>{email.email}</div>
                        ))}
                        <div>Count is: {contactEmailList.length}</div>
                    </div>

                }
            </div>
            <h2 className='text-center my-4'>Urls with no Email</h2>
            <div className="container w-75">
                {error && <h3 className='text-danger text-center'>Error: {error}</h3>}
                {
                    noEmailList &&
                    <div>
                        {noEmailList.map((url, i) => (
                            <div key={i}>{url}</div>
                        ))}
                        <div>Count is: {noEmailList.length}</div>
                    </div>

                }
            </div>
        </div>
    );
}

export default processEmails;