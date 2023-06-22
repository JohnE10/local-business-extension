

const checkSecure = () => {

    const isSecure = req.headers['x-forwarded-proto'] === 'https';

    if (!isSecure) {
      console.log('The site is not secure.');
      // Perform any additional actions you need for a non-secure site
    }
  
    return res.status(200).end();
}

export default checkSecure