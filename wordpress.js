import fetch from 'isomorphic-fetch';

// const WORDPRESS_API_URL = 'https://example.com/wp-json/wp/v2'; // Replace with your WordPress API URL

const WORDPRESS_API_URL = 'https://uptownsmiles.com/wp-json/wp/v2';
// const WORDPRESS_API_URL = 'https://uptownsmiles.com/wp-json/wp/v2/pages/';

export async function getPages() {

  const response = await fetch(`${WORDPRESS_API_URL}/pages?_fields=id,slug`);
  const pages = await response.json();

  return pages;
}

export async function getPageBySlug(slug) {

    const response = await fetch(`${WORDPRESS_API_URL}/pages?slug=${slug}&_embed`);
    const pages = await response.json();
    
    return pages[0];
  }
  
