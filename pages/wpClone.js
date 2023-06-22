

export const getStaticProps = async () => {

    const axios = require('axios');
    const fs = require('fs');

    // Replace 'http://example.com' with the base URL of the WordPress site you want to clone
    const siteUrl = 'https://downloadplrproducts.com';

    // Replace 'http://newsite.com' with the base URL of the new site where you want to clone the content
    const NEW_SITE = process.env.NEW_SITE;
    const newSiteUrl = NEW_SITE;

    // Replace 'http://example.com/wp-json' with the WP REST API endpoint of the source site
    const wpApiEndpoint = `${siteUrl}/wp-json`;

    // Function to fetch all posts from the source site
    const fetchPosts = async () => {
        const response = await axios.get(`${wpApiEndpoint}/wp/v2/posts`);
        return response.data;
    };

    // Function to fetch all pages from the source site
    const fetchPages = async () => {
        const response = await axios.get(`${wpApiEndpoint}/wp/v2/pages`);
        return response.data;
    };

    // Function to clone posts to the new site
    const clonePosts = async (posts) => {
        for (const post of posts) {
            const newPost = {
                title: post.title.rendered,
                content: post.content.rendered,
                // Copy any other necessary fields here
            };

            await axios.post(`${newSiteUrl}/wp-json/wp/v2/posts`, newPost);
            console.log(`Post cloned: ${post.title.rendered}`);
        }
    };

    // Function to clone pages to the new site
    const clonePages = async (pages) => {
        for (const page of pages) {
            const newPage = {
                title: page.title.rendered,
                content: page.content.rendered,
                // Copy any other necessary fields here
            };

            await axios.post(`${newSiteUrl}/wp-json/wp/v2/pages`, newPage);
            console.log(`Page cloned: ${page.title.rendered}`);
        }
    };

    // Function to clone the WordPress site
    const cloneWordPressSite = async () => {

        // console.log('Fetching posts from the source site...');
        // const posts = await fetchPosts();

        console.log('Fetching pages from the source site...');
        const pages = await fetchPages();

        // console.log('Cloning posts to the new site...');
        // await clonePosts(posts);

        console.log('Cloning pages to the new site...');
        await clonePages(pages);

        console.log('WordPress site cloning completed successfully!');

    };

    // Call the main cloning function
    const clonedPages = await cloneWordPressSite();

    return { props: { clonedPages } }

};

const wpClone = ({ clonedPages }) => {

    return (
        <div>
            wpClone
        </div>
    )
}

export default wpClone
