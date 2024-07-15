export const copyToClipboard = (text: string): void => {
  navigator.clipboard
    .writeText(text)
    .then(() => { })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
    });
};