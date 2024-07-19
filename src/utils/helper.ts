export let basicAuthUsername: string = '';
export let basicAuthPassword: string = '';

export const copyToClipboard = (text: string): void => {
  navigator.clipboard
    .writeText(text)
    .then(() => { })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
    });
};

export const getAuthUserName = () => {
  return basicAuthUsername;
};

export const getAuthUserPassword = () => {
  return basicAuthPassword;
};

export const setAuthUserName = (name: string) => {
  basicAuthUsername = name;
};

export const setAuthUserPassword = (password: string) => {
  basicAuthPassword = password;
};