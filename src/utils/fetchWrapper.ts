const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJlbWFpbCI6InVzbWFuK2FkbWluQG9wZW5sZXR0ZXJjb25uZWN0LmNvbSIsImFwaUtleUlkIjoiNCIsImlhdCI6MTcxNzUxNDc0MCwiZXhwIjo0ODczMjc0NzQwfQ.D_yEcZ4ZJtM0ArzaYqnV8ggCsT52l4ALbzsX1QkATag';
const API_BASE_URL = 'https://stageapi.openletterconnect.com/api/v1';

const getHeaders = (additionalHeaders: Record<string, string> = {}) => ({
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  ...additionalHeaders,
});

export interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}


const fetchWrapper = async (endpoint: string, options: RequestOptions) => {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);
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
