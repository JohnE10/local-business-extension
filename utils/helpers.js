import temp from '../pages/temp';


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
};

export const randomStr = (length) => {
  // declare all characters
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = ' ';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;

};

export const toCamelCase = (str) => {

  str = str.trim();

  let words = [];

  let divider = '-:5:-';
  const chars = ['-', '_'];

  chars.forEach(ele => {
    if (str.includes(ele)) {
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
};

export const capFirst = (str) => {

  let capitalizedString = '';
  const chars = ['-', '_'];

  if (str) {
    chars.forEach((ele) => {
      if (str.includes(ele)) {
        str = str.replaceAll(ele, ' ');
      }
    })
    capitalizedString = str.replace(/\b\w/g, letter => letter.toUpperCase());

  }

  return capitalizedString;

};

export const styleAttrToNext = (style) => {

  let semiColonSplitArr = [];
  let propValueArr = [];
  let cssProp = '';
  let cssValue = '';

  const toNextCss = (str) => {
    if (str.trim() != '') {
      if (!str.includes('https:') && !str.includes('http:')) {
        if (str.includes(':')) {
          let tempObj = {};
          let key = toCamelCase(str.split(':')[0]);
          tempObj[key.trim()] = str.split(':')[1].trim();
          propValueArr.push(tempObj);
        }

      }
      else {
        if (str.includes(':')) {
          const tempArr = ['https:', 'http:'];
          tempArr.forEach((temp) => {
            if (str.includes(temp)) {
              str = str.replaceAll(temp, '-(tempDivider)-');
              let tempObj = {};
              let key = toCamelCase(str.split(':')[0]);
              let tempValue = str.split(':')[1].trim();
              tempValue = tempValue.replaceAll('-(tempDivider)-', temp);
              tempObj[key.trim()] = tempValue;
              if (!propValueArr.includes(tempObj)) {
                propValueArr.push(tempObj);
              }
            }
          });
        }
      }

    }
  }

  style = style.trim();

  if (style.includes(';')) {
    semiColonSplitArr = style.split(';');
    semiColonSplitArr.map((ele) => {
      toNextCss(ele);
    })
  }
  else {
    toNextCss(style);
  }

  const strArr = propValueArr.map(obj => Object.keys(obj)[0] + ': ' + `'${Object.values(obj)[0]}'`);

  const joinedStr = '{{' + strArr.join(', ') + '}}';

  return joinedStr;
};

// export const fetchUrlData = async (url) => {

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw Error('Did not get a response from server.');
//     }

//     const data = await response.text();
//     // console.log(data);
//     console.log('Done');

//     return { success: data };

//   } catch (err) {
//     console.log(err);
//     return { error: err.message };
//   }

// }