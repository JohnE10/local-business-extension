import React, { useEffect, useState } from 'react'
import { fileNameFromUrl, isAbsoluteURL } from '../utils/helpers';
import useFetch from './customHooks/useFetch';
import { parse } from 'url';



const temp2 = () => {




	// Usage
	const directory = 'C:/Users/jetto/OneDrive/Desktop/Files/Coding-ASUS/WP Migration Campaign/smilingfacesnola/public/';

	const filename = 'Defaults21ea.eot';

	const foundFilePath = searchFile(directory, filename);
	if (foundFilePath) {
		console.log(`File found at: ${foundFilePath}`);
	} else {
		console.log(`File not found.`);
	}



	return (
		<div>
			<div className='d-flex flex-column justify-content-center align-items-center'>
				{/* {loading && <div>... Loading</div>}
        {useFetchError && <div className='text-danger'>{useFetchError}</div>} */}
				<div className='d-flex justify-content-center align-items-center '>
					<div><label>Enter BasePath:</label></div>
					<div>
						<input
							type='text'
							value={str}
							onChange={(e) => setStr(e.target.value.replaceAll('\\', '/'))}
						/>
					</div>
					<div>
						<button onClick={handleSubmit}>Submit</button>
					</div>
				</div>

			</div>


			{html && <div style={{ width: '60%', margin: 'auto' }}>{$.html()}</div>}


		</div>
	)
}

export default temp2;