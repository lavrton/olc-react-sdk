import fetchWrapper from './fetchWrapper';

export const get = async (endpoint: string, params?: any) => {
  return await fetchWrapper(endpoint, {
    method: 'GET',
    params,
  });
};

export const post = async (endpoint: string, body: any) => {
  return await fetchWrapper(endpoint, {
    method: 'POST',
    body,
  });
};

export const put = async (endpoint: string, body: any) => {
  return await fetchWrapper(endpoint, {
    method: 'PUT',
    body,
  });
};

export const patch = async (endpoint: string, body: any) => {
  return await fetchWrapper(endpoint, {
    method: 'PATCH',
    body,
  });
};

export const del = async (endpoint: string, params?: Record<string, string>) => {
  return await fetchWrapper(endpoint, {
    method: 'DELETE',
    params,
  });
};
