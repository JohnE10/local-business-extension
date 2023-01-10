import { useState } from "react";

const Temp = () => {


    const [textArea, setTextArea] = useState('');
    const [urls, setUrls] = useState(null);

    const handleClick = (e) => {
        if (textArea != '') {
            setUrls(textArea.split('\n'));
        }
    }

    if (urls) {
        for (let i = 0; i < urls.length; i++) {
            console.log(urls[i]);
        }
    }



    return (

        <div>
            <div className='text-center'>
                <label className='w-100 fw-bold mb-1'>Paste URLs:</label>
                <textarea className='w-50'
                    value={textArea}
                    placeholder='Paste your urls here...'
                    onChange={(e) => setTextArea(e.target.value)}
                />
                <div className='w100 m-3'>
                    <button onClick={handleClick}>Submit</button>
                </div>

            </div>
        </div>

    );
}

export default Temp;