

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

// export const saveFile = async (url) => {
  
//   try {

//     const parsedUrl = new URL(url);
//     const file = parsedUrl.pathname.replace('/', '');

//     const data = await fetchUrlData(url);

//     if(data.error) {
//       throw Error(data.error);
//     }
//     else if(data.success) {
//       fs.writeFileSync(file, data);
//       return {success: 'Page Created'}
//     }

//   } catch (err) {
//     return res.status(200).json({ error: err.message });
//   }

// }