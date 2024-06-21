/* eslint-disable no-useless-catch */

// Actions
import {
  getViewProof
} from '../redux/actions/templateActions';
import { success, failure } from '../redux/actions/snackbarActions';

// Utils
import { multiPageLetters, Barcode } from './constants';

// Restricted Area Files
import { addRestrictedAreaToBiFold } from './templateRestrictedArea/biFold';
import { addRestrictedAreaToPostCard } from './templateRestrictedArea/postCard';
import { addAreaToProfessionalLetters } from './templateRestrictedArea/professional';
import { addRestrictedAreaToTriFold } from './templateRestrictedArea/triFold';


export const addressPrinting = {
  'Postcards-': true,
  'Tri-Fold Self-Mailers-': true,
  'Bi-Fold Self-Mailers-': true,
  'Professional Letters-#10 Double-Window': true,
};

export const multiPageTemplates = [
  'Postcards',
  'Tri-Fold Self-Mailers',
  'Bi-Fold Self-Mailers',
];

export const envelopeTypes = [
  { id: 1, label: 'Windowed Envelope', type: '#10 Double-Window' },
  { id: 2, label: 'Non-Windowed Envelope', type: '#10 Grey' },
];

export const toggleFigure = (store, key, value) => {
  store.getElementById(key).set({ visible: value });
};

export const isValidHtmlContent = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.childElementCount !== 0;
};

export const getFileAsBlob = async (url, returnType = 'json') => {
  try {
    const response = await axios.get(url, {
      responseType: 'blob',
    });
    return returnType === 'json'
      ? blobToJSON(response.data)
      : blobToString(response.data);
  } catch (error) {
    throw error; // Optionally rethrow the error for further handling
  }
};

const blobToJSON = (jsonBlob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // Define a callback function for when the FileReader finishes reading
    reader.onload = function () {
      try {
        // Parse the result as JSON
        const parsedData = JSON.parse(reader.result);

        // Resolve the promise with the parsed JSON data
        resolve(parsedData);
      } catch (error) {
        // Reject the promise with the error
        reject(error);
      }
    };

    // Define a callback function for when there is an error reading the Blob
    reader.onerror = function (error) {
      // Reject the promise with the error
      reject(error);
    };

    // Start reading the Blob as text
    reader.readAsText(jsonBlob);
  });
};

export const blobToString = (blob) => {
  return new Promise((resolve, reject) => {
    const blobObject = new Blob([blob], { type: 'text/plain' });
    const reader = new FileReader();

    // Define a callback function for when the reading is complete
    reader.onloadend = function () {
      // The result property contains the data as a string
      const blobString = reader.result;

      // Resolve the Promise with the blobString
      resolve(blobString);
    };

    // Define a callback function for when an error occurs
    reader.onerror = function (error) {
      // Reject the Promise with the error
      reject(error);
    };

    // Start reading the content of the Blob as text
    reader.readAsText(blobObject);
  });
};

export const exportPdfViewProofWithDummyData = async (store, title, fields) => {
  const json = store.toJSON();
  let jsonString = JSON.stringify(json);
  fields.forEach(({ key, defaultValue, value }) => {
    const regex = new RegExp(key, 'g');
    jsonString = jsonString.replace(regex, defaultValue || value);
  });
  const jsonWithDummyData = JSON.parse(jsonString);
  store.loadJSON(jsonWithDummyData);
  await store.waitLoading();
  await store.saveAsPDF({ fileName: title + '.pdf', pixelRatio: 2 });
  store.loadJSON(json);
};

export const extractVariablesFromHtml = (html) => {
  const placeholderRegex =
    /\{\{\s*([A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*)\s*\}\}/g;

  // Extract matches from the HTML string
  const matches = html.match(placeholderRegex);

  // Log the matches
  if (!matches) return [];
  var regex = /{{(.*?)}}/;
  return matches.map((item) => {
    const matchArray = item.match(regex);
    if (matchArray && matchArray[1]) {
      const [fullMatch, variable] = matchArray;
      return {
        key: fullMatch,
        value: variable,
        defaultValue: variable,
      };
    } else {
      return {
        key: item,
        value: item,
        defaultValue: item,
      };
    }
  });
};

export const htmlWithDummyData = (html, fields) => {
  let htmlString = html;
  fields.forEach(({ key, defaultValue, value }) => {
    const regex = new RegExp(key, 'g');
    htmlString = htmlString.replace(regex, defaultValue || value);
  });
  return htmlString;
};

export const createViewProof = (title, id) => async (dispatch) => {
  const response = await getViewProof(id);
  const binaryData = atob(response.data.data.base64Pdf);

  if (response.status === 200) {
    // Create a Uint8Array from the binary data
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    const blob = new Blob([uint8Array], { type: 'application/pdf' });

    // Create an Object URL for the Blob
    const url = URL.createObjectURL(blob);
    downloadPDF(title, url);
    dispatch(success('Download Proof generated successfully'));
  } else {
    dispatch(failure(response.data.message));
  }
};

export const downloadPDF = (title, url) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = title + '.pdf';

  // Append the link to the document
  document.body.appendChild(link);

  // Trigger a click on the link
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
};

export const drawRestrictedAreaOnPage = (store, product, envelopeType) => {
  if (addressPrinting[`${product.productType}-${envelopeType}`]) {
    if (product.productType === 'Professional Letters') {
      addAreaToProfessionalLetters(store, Barcode);
    } else if (product.productType === multiPageLetters[0]) {
      addRestrictedAreaToPostCard(
        store,
        [3.2835, 2.375],
        Barcode,
        product.productType === 'Postcards',
      );
    } else if (product.productType === multiPageLetters[1]) {
      addRestrictedAreaToTriFold(store, [3.2835, 2.375], Barcode);
    } else if (product.productType === multiPageLetters[2]) {
      addRestrictedAreaToBiFold(store, [3.2835, 2.375], Barcode);
    }
  }
};

export const extractFontFamilies = (jsonData) => {
  const fontFamilies: any = [];

  // Iterate through each object in the JSON data
  jsonData.forEach((obj) => {
    if (obj.children) {
      // Iterate through each child object
      obj.children.forEach((child) => {
        if (child.type === 'text' && child.fontFamily) {
          // Extract font family from text objects
          fontFamilies.push(child.fontFamily);
        }
      });
    }
  });
  return fontFamilies;
};