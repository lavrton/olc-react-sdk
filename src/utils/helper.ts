export let apiKey: string | null = null;
export let appMode: string = 'test';

export const copyToClipboard = (text: string): void => {
  navigator.clipboard
    .writeText(text)
    .then(() => { })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
    });
};

export const setApiKey = (key: string) => {
  apiKey = key
};

export const setMode = (mode: string) => {
  appMode = mode
};