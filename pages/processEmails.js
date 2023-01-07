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

    // find value in array of objecys
    function search(key, keyValue, arr){
        for (let i=0; i < arr.length; i++) {
            if (arr[i].key == keyValue) {
                return arr[i];
            }
        }
    }

    // declare variables
    const [pageContent, setPageContent] = useState([]);
    const [emailList, setEmailList] = useState([]);
    const [checkContact, setCheckContact] = useState([]);
    const [noEmailList, setNoEmailList] = useState([]);
    const [error, setError] = useState(null);

    // const noEmailList = [];

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
            const tempArr = [...ele.data.matchAll(emailRegEx)]; // get all email addresses in page content
            // if url has no email, then stick it in the checkContact array to see if there's an email in the contact page
            if (tempArr.length == 0) {
                if (!checkContact.map(a => a.url).includes(ele.url)) {  // no dupes
                    checkContact.push({url: ele.url, data: ele.data});
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


    // // for those urls with no email found, check the contact page 
    // if(checkContact.length>0) {
    //     checkContact.forEach((url) => {
    //         // let tempArr = search('url', url, pageContent)
    //         // console.log('tempArr', tempArr);
    //         console.log('url is: ', url);
    //     })  
    // }

    console.log('emailList is: ', emailList);

    console.log('checkContact is: ', checkContact);

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
            <h2 className='text-center my-4'>Urls with no Email List</h2>
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