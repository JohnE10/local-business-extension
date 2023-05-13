import { toCamelCase } from '../../utils/helpers';


const ApiTemp2 = async (req, res) => {

const str = 'fast-old_cars';

const joined = toCamelCase(str);

return res.send(joined);

}

export default ApiTemp2;