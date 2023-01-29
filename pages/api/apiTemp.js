const ApiTemp = () => {

    // Accessing dns module
    const dns = require('dns');

    let urls = [
        'projectcoder.xyz',
    ];

    // Set the rrtype for dns.resolve() method
    const rrtype = "MX";

    urls.forEach((url) => {
        let rec;

        // Calling dns.resolve() method for hostname
        // geeksforgeeks.org and print them in
        // console as a callback
        dns.resolve(url, rrtype, (err, records) => {
            
            // console.log('records: %j', records);
            // console.log(url);
            rec = records;
            // console.log('rec: %j', rec[0].exchange);
            // console.log('rec: %j', rec.map(a => a.exchange));
            console.log('rec: %j', records);
        });
    });

    return (
        <div>

        </div>
    );

}

export default ApiTemp;