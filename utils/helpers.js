

export const validateURL = (url) => {
  // Regular expression for URL format.
  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
  // const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[^\s\/$.?#].[^\s]*$/;

  // Test the URL against the regex
  console.log('validateURL result: ', urlRegex.test(url));
  return urlRegex.test(url);
}

export const isValidUrl = (url) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}

export const fetchUrlData = async (url) => {

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error('Did not get a response from server.');
    }

    const data = await response.text();
    // console.log(data);
    console.log('Done');

    return { success: data };

  } catch (err) {
    console.log(err);
    return { error: err.message };
  }

}

export const toCamelCase = (str) => {

  str = str.trim();
  
  let words = [];

  let divider = '-:5:-';
  const chars = ['-', '_'];

  chars.forEach(ele => {
    if(str.includes(ele)) {
      str = str.replaceAll(ele, divider);
    }
  })

  words = str.split(divider);

  const camelCaseString = words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  }).join('');

  return camelCaseString;
}
