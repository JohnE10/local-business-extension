import { useEffect, useState } from 'react';


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

export const fileNameFromUrl = (url) => {
  // // Remove any query parameters from the URL

  // const cleanUrl = url.split('?')[0];

  // // Split the URL by slashes to get individual parts
  // const parts = cleanUrl.split('/');
  const parts = url.split('/');

  // Get the last part of the URL, which should be the file name
  const fileName = parts[parts.length - 1];

  let parentDirectory = '';

  if (parts.length > 1) {
    parentDirectory = parts[parts.length - 2];
  }
  return { fileName, parentDirectory };
};

export const isAbsoluteURL = (url) => {

  const absoluteURLPattern = /^(https?:\/\/)/i;

  return absoluteURLPattern.test(url);

};

export const checkUrlSecure = (url) => {

  const https = require('https');

  return new Promise((resolve, reject) => {
    const options = {
      method: 'HEAD',
      host: url,
      port: 443,
    };

    const request = https.request(options, (response) => {
      resolve(response.statusCode === 200);
    });

    request.on('error', (error) => {
      reject(error);
    });

    request.end();
  });
};

export const stringContains = (str, query) => {
  const match = query.every(element => str.toLowerCase().includes(element.toLowerCase()));
  return match;

};

export const queryLocations = {
  // louisianaCities: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Metairie', 'Lafayette', 'Lake Charles', 'Kenner', 'Bossier City', 'Monroe', 'Alexandria', 'Prairieville', 'Marrero', 'Houma', 'Central', 'Laplace', 'Slidell', 'New Iberia', 'Terrytown', 'Ruston', 'Chalmette', 'Bayou Cane', 'Hammond', 'Harvey', 'Sulphur', 'Shenandoah', 'Zachary', 'Estelle', 'Natchitoches', 'Youngsville', 'Gretna', 'Thibodaux', 'Opelousas', 'Broussard', 'Luling', 'Pineville', 'River Ridge', 'Mandeville', 'Claiborne', 'Gonzales', 'West Monroe', 'Carencro', 'Baker', 'Destrehan', 'Covington', 'Moss Bluff', 'Minden', 'Crowley', 'Woodmere', 'Bayou Blue', 'Waggaman', 'Morgan City', 'Raceland', 'Gardere', 'Abbeville', 'Timberlane', 'Jefferson', 'Bogalusa', 'Belle Chasse', 'DeRidder', 'Jennings', 'Denham Springs', 'Fort Polk South', 'Eunice', 'Oak Hills Place', 'Bastrop', 'Merrydale', 'Old Jefferson', 'Harahan', 'Village St. George', 'Reserve', 'Scott', 'Eden Isle', 'Westwego', 'Prien', 'Ponchatoula', 'Lacombe', 'St. Rose', 'Bridge City', 'Red Chute', 'Breaux Bridge', 'Galliano', 'Addis', 'Meraux', 'Rayne', 'Donaldsonville', 'Inniswold', 'Elmwood', 'Larose', 'St. Gabriel', 'Oakdale', 'Franklin', 'Walker', 'Ville Platte', 'Gray', 'Plaquemine', 'Tallulah', 'Brownfields', 'Patterson', 'Schriever', 'Leesville'],
  louisianaCities: 'elmwood',
  // louisianaCities: ['Elmwood', 'Mandeville' ],
  // louisianaCities: ['Mandeville', 'Elmwood'],
}
