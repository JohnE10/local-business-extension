const emailValidator = require('deep-email-validator');

const ApiTemp2 = async () => {

    async function isEmailValid(email) {
        return emailValidator.validate(email)
    }

    const temp = await isEmailValid('info@wld.ikc.mybluehost.me');
    console.log(temp.valid, temp.reason);

    return (
        <div>

        </div>
    );

}

export default ApiTemp2;