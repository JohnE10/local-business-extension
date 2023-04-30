import React from 'react'

const googlePageSpeedInsightsApi = async (req, res) => {

    const GOOGLE_PAGESPEED_KEY = process.env.GOOGLE_PAGESPEED_KEY;

    try {

        const url = req.query.url;
        console.log(url);

        // const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.example.com&key=YOUR_API_KEY`;
        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${GOOGLE_PAGESPEED_KEY}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
            throw Error('Did not get a response from server.');
        }

        console.log('Done');

        return res.status(200).json({ success: data });

    } catch (err) {
        console.log(err);
        return res.status(200).json({ error: err.message });
    }

}

export default googlePageSpeedInsightsApi