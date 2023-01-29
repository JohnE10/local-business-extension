import { useState } from 'react';
const emailValidator = require('deep-email-validator');

export default async function handler(req, res) {

    if (req.body.email) {
        console.log('req.body.email: ', req.body.email);
    }

    const email = 'contact@jeip.net';

    const url = `https://verify.gmass.co/verify?email=${email}&key=d92ec8ef-df79-4b4e-9895-91d2e6c51d1f`;

    const response = await fetch(url);
    const data = await response.json();

    console.log('data is: ', data);

    // async function isEmailValid(email) {
    //     return emailValidator.validate(email)
    // }

    // const data = await isEmailValid(req.body.email);
    // console.log('data.valid: ', data);

    res.status(200).send(JSON.stringify({ data: data}));

}
