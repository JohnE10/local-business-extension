import { useEffect, useState } from "react";

const VerifyEmails = () => {

    const [textArea, setTextArea] = useState('');
    const [emails, setEmails] = useState(null);
    const [results, setResults] = useState([]);

    const handleClick = (e) => {
        if (textArea != '') {
            setEmails(textArea.split('\n'));
        }
    }

    // fetch page content
    useEffect(() => {
        if (emails != undefined) {
            emails.forEach((email) => {
                const fetchData = async (email) => {
                    const response = await fetch('http://localhost:3000/api/handleVerifyEmails', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify({ email: email })
                    });
                    const data = await response.json();
                    console.log('data is: ', data);
                    setResults((results) => [...results, { email: email, valid: data.valid, reason: data.reason }]);
                    console.log('results is: ', results);
                }
                fetchData(email);
            });
        }

    }, [emails]);

    return (
        <div>
            <div className='text-center'>
                <label className='w-100 fw-bold mb-1'>Paste URLs:</label>
                <textarea className='w-50' rows={6}
                    value={textArea}
                    placeholder='Paste your emails here...'
                    onChange={(e) => setTextArea(e.target.value)}
                />
                <div className='w100 m-3'>
                    <button onClick={handleClick}>Submit</button>
                </div>
            </div>

            {results &&
                <div className='text-center'>
                    {results.map((ele, i) => (
                        <div key={i}>{ele.email} - {ele.valid} - {ele.reason}</div>
                    ))}
                </div>
            }


        </div>

    );
}

export default VerifyEmails;