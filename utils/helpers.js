

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

      return res.status(200).json({ success: data });

  } catch (err) {
      console.log(err);
      return res.status(200).json({ error: err.message });
  }

}