import { useEffect, useState } from "react";

const capFirst = () => {

    const [str, setStr] = useState(null);
    useEffect(() => {
        if(str) {
            setStr(str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().substring(1));
        }
    }, [str]);

    return (

        <div className="text-center">
            <h1 style={{ marginBottom: '20px' }}>Capitalize First Letter</h1>
            <label>Enter string:</label>
            <input
                type="text"
                style={{marginBottom: '20px'}}
                required
                className="type"
                placeholder="enter string"
                onChange={(e) => setStr(e.target.value)}
            />
            {/* <button onClick={() => capFirst()}>Submit</button> */}

            {/* {str != '' ? <div>Result: { str2 }</div> : ''} */}
            {str && <div>Result: { str }</div>}
        </div>



    );
}

export default capFirst;