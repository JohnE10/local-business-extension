import { useEffect, useState } from "react";

const ExtractNames = () => {

    const [textArea, setTextArea] = useState('');
    const [emails, setEmails] = useState(null);
    const [fNames, setFNames] = useState([]);

    const capFirstLetter = (str) => {
        str = str.toLowerCase();
        str = str.charAt(0).toUpperCase() + str.substring(1);
        return str;
    }


    const handleClick = (e) => {
        // e.invokeDefault;
        if (textArea != '') {
            setEmails(textArea.split('\n'));
        }
    }

    useEffect(() => {
        setFNames([]);
        if (emails) {
            emails.forEach((email) => {
                if (email.includes('@')) {
                    let temp = email.split('@')[0];
                    if (temp.includes('.')) {
                        let finalStr = capFirstLetter(temp.split('.')[0]);
                        setFNames(oldArray => [...oldArray, finalStr]);
                    } else {
                        let finalStr = capFirstLetter(email.split('@')[0]);
                        setFNames(oldArray => [...oldArray, finalStr]);
                    }
                }
            });
        }
    }, [emails]);

    console.log('emails: ', emails);

    console.log(fNames);

    return (

        <div className="text-center">
            <div className='text-center my-5'>
                <label className='w-100 fw-bold mb-1'>Paste URLs:</label>
                <textarea className='w-50' rows={6}
                    value={textArea}
                    placeholder='Paste your urls here...'
                    onChange={(e) => setTextArea(e.target.value)}
                />
                <div className='w100 m-3'>
                    <button onClick={handleClick}>Submit</button>
                </div>

                {fNames &&
                    <div className="mt-5">
                        {fNames.map((fName, i) => (
                            <div key={i}>{fName}</div>
                        ))}
                    </div>}
            </div>
        </div>
    );
}

export default ExtractNames;