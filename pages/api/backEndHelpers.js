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