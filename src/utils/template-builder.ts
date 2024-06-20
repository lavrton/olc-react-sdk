/* eslint-disable no-useless-catch */
import { get } from '../utils/api';

// Utils
import { multiPageLetters, Barcode } from './constants';

// Restricted Area Files
import { addRestrictedAreaToBiFold } from './templateRestrictedArea/biFold';
import { addRestrictedAreaToPostCard } from './templateRestrictedArea/postCard';
import { addAreaToProfessionalLetters } from './templateRestrictedArea/professional';
import { addRestrictedAreaToTriFold } from './templateRestrictedArea/triFold';


export const addressPrinting: { [key: string]: boolean } = {
  'Postcards-': true,
  'Tri-Fold Self-Mailers-': true,
  'Bi-Fold Self-Mailers-': true,
  'Professional Letters-#10 Double-Window': true,
};

export const multiPageTemplates: string[] = [
  'Postcards',
  'Tri-Fold Self-Mailers',
  'Bi-Fold Self-Mailers',
];

export interface EnvelopeType {
  id: number,
  label: string,
  type: string
}

export const envelopeTypes: EnvelopeType[] = [
  { id: 1, label: 'Windowed Envelope', type: '#10 Double-Window' },
  { id: 2, label: 'Non-Windowed Envelope', type: '#10 Grey' },
];

export const getFileAsBlob = async (url: string, returnType: string = 'json'): Promise<any> => {
  try {
    // const response = await get(`templates/${id}/view-proof`);
    const response = await get(url, {
      responseType: 'blob',
    });
    return returnType === 'json'
      ? blobToJSON(blob)
      : blobToString(blob);
  } catch (error) {
    throw error; // Optionally rethrow the error for further handling
  }
};

const blobToJSON = (jsonBlob: Blob): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      try {
        // Parse the result as JSON
        const parsedData = JSON.parse(reader.result as string);

        // Resolve the promise with the parsed JSON data
        resolve(parsedData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsText(jsonBlob);
  });
};

export const blobToString = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = function () {
      // The result property contains the data as a string
      const blobString = reader.result as string;

      // Resolve the Promise with the blobString
      resolve(blobString);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsText(blob);
  });
};

export const downloadPDF = (title: string, url: string): void => {
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

export interface Product {
  productType: string;
}

export const drawRestrictedAreaOnPage = (store: any, product: Product, envelopeType: string) => {
  if (addressPrinting[`${product.productType}-${envelopeType}`]) {
    if (product.productType === 'Professional Letters') {
      addAreaToProfessionalLetters(store, Barcode);
    } else if (product.productType === multiPageLetters[0]) {
      addRestrictedAreaToPostCard(
        store,
        [3.2835, 2.375],
        Barcode
      );
    } else if (product.productType === multiPageLetters[1]) {
      addRestrictedAreaToTriFold(store, [3.2835, 2.375], Barcode);
    } else if (product.productType === multiPageLetters[2]) {
      addRestrictedAreaToBiFold(store, [3.2835, 2.375], Barcode);
    }
  }
};

export const extractFontFamilies = (jsonData: any[]): string[] => {
  const fontFamilies: string[] = [];

  // Iterate through each object in the JSON data
  jsonData.forEach((obj) => {
    if (obj.children) {
      // Iterate through each child object
      obj.children.forEach((child: any) => {
        if (child.type === 'text' && child.fontFamily) {
          // Extract font family from text objects
          fontFamilies.push(child.fontFamily);
        }
      });
    }
  });
  return fontFamilies;
};