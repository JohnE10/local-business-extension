import { set } from "mongoose";
import { useEffect, useState } from "react";
import EmailListTable from "../components/EmailListTable";

const processEmails = () => {

    const [pageContent, setPageContent] = useState(null);
    const [emailList, setEmailList] = useState([]);
    const [error, setError] = useState(null);

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
                setPageContent(data);
            }
            fetchData();
        });
    }, []);


    if (pageContent) {
        const tempArr = [...pageContent.matchAll(emailRegEx)];

        for (let i = 0; i < tempArr.length; i++) {

            if (!emailList.includes(tempArr[i][0]) && !tempArr[i][0].includes('/')) {
                if(tempArr[i][0].substr(tempArr[i][0].length - 4) != '.png') {
                    emailList.push(tempArr[i][0]);
                }
                
            }
        }

    } else {
        console.log('it is not here');
    }

    console.log('emailList is: ');
    emailList.forEach((email) => {
        console.log(email);
    })

    return (

        <div>
            {/* <h2 className='text-center my-4'>Email List</h2>
            <div className="container w-75">
                {error && <h3 className='text-danger text-center'>Error: {error}</h3>}
                {emailList && !error && <EmailListTable emailList={emailList} />}
            </div> */}

        </div>

    );
}

export default processEmails;