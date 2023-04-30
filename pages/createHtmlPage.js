

export const getStaticProps = async () => {

    const url = 'https://www.midcitysmiles.com/blog/';

    const response = await fetch(url);
    const html = await response.text();

    return {
        props: { html }
    }

}

const createHtmlPage = ({ html }) => {



    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: html }} />

        </>

    )
}

export default createHtmlPage;