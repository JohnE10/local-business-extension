const fs = require('fs');

const buildPageBody = (req, res) => {

    let fileName = 'indexBody.html';

    const body = req.body;
    console.log('req.body: ', body);

    fs.writeFileSync(fileName, JSON.parse(body));

}

export default buildPageBody