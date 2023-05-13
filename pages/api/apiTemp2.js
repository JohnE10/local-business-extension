import { toCamelCase } from '../../utils/helpers';


const ApiTemp2 = async (req, res) => {

    const url = 'https://jsonplaceholder.typicode.com/users';

    try {

        const tempFunc = async (siteUrl) => {

            let tempData = '';
            setTimeout(async () => {
            
                const response = await fetch(siteUrl);
                tempData = await response.json();

            }, 500);
            return tempData;
        }

        await tempFunc(url)
        .then((results) => {
            console.log('results: ', results);
            return res.json({results});
        });
    
        // console.log('data: ', data);

        // return res.json({data});

    } catch (err) {
        console.log(err.message);
    }

}

export default ApiTemp2;