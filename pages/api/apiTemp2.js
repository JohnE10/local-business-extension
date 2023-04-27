const emailValidator = require('deep-email-validator');

const ApiTemp2 = async (req, res) => {

    async function isEmailValid(email) {
        return emailValidator.validate(email)
    }

    let email = 'csworg@gmail.com';

    const temp = await isEmailValid(email);
    console.log(temp.valid, temp.reason);

    res.json({isEmailValid: temp, email: email, 'is it valid': temp.valid, 'reason': temp.reason});

}

export default ApiTemp2;