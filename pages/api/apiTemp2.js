import { capFirst, toCamelCase } from '../../utils/helpers';


const ApiTemp2 = async (req, res) => {

    const url = 'https://jsonplaceholder.typicode.com/users';

    try {

        let string = 'background-image: url(https://www.midcitysmiles.com/blog/wp-content/uploads/2022/06/horiz-1-2000x1200.png);';
        // string = capFirst(string);

        string = toCamelCase(string);

        // const capitalizedString = string.replace(/\b\w/g, letter => letter.toUpperCase());
        // const url = 'https://www.midcitysmiles.com/blog/contact-us/';

        // const parsedUrl = new URL(url);
        // console.log('host: ', parsedUrl.host);
        // console.log('pathname: ', parsedUrl.pathname);

        return res.send(string);

    } catch (err) {
        console.log(err.message);
        return res.send(err.message);
    }

}

export default ApiTemp2;