import axios from 'axios';

export const getStaticProps = async () => {

    const url = 'http://cbddentalcare.com/ ';

    const response = await fetch(url);
    const html = await response.text();

    // const response = await axios.get('https://example.com');
    // const html = await response.data;

    return {
        props: { html }
    }

}

const createHtmlPage = ({ html }) => {

    console.log(typeof html);

    // const toReplace = "<img alt=\"logo\" src=\"/wp-content/themes/charlie-child/images/logo.png\">";
    // const replacement = "<img alt=\"logo\" src=\"https://www.ladentalcenterstclaude.com/wp-content/themes/charlie-child/images/logo.png\">";

    // html = html.replace(toReplace, replacement);

    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    )
}

export default createHtmlPage;