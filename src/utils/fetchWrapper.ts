import { PROD_API_BASE_URL, STAGE_API_BASE_URL } from "./constants";
import { getAuthUserName, getAuthUserPassword, getIsSandbox } from "./helper";

const base64Credentials = () => btoa(`${getAuthUserName()}:${getAuthUserPassword()}`);

const getHeaders = (additionalHeaders: Record<string, string> = {}) => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Basic ${base64Credentials()}`,
  ...additionalHeaders,
});

export interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}


const fetchWrapper = async (endpoint: string, options: RequestOptions) => {
  const baseUrl = getIsSandbox() ? STAGE_API_BASE_URL : PROD_API_BASE_URL;
  const url = new URL(`${baseUrl}${endpoint}`);
  if (options.method === 'GET' && options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const fetchOptions: RequestInit = {
    method: options.method,
    headers: getHeaders(options.headers),
  };

  if (options.method !== 'GET' && options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  // Add body to fetchOptions if present
  if (options.body) {
    if (options.body instanceof FormData) {
      fetchOptions.body = options.body;
      // @ts-ignore
      delete fetchOptions?.headers['Content-Type'];
    } else {
      fetchOptions.headers = getHeaders(options.headers);
    }
  }

  try {
    const response = await fetch(url.toString(), fetchOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred');
    }

    if (response.status === 204) {
      return null;
    }

    const data = await response.json();
    return { status: response.status, data };

  } catch (error) {
    return error
  }
};

export default fetchWrapper;
