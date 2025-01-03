import axios from 'axios';

const makeApiCall = async (method, endpoint, data = null, params = null) => {
  const baseURL = import.meta.env.VITE_API_HOST;
  try {
    const config = {
      method, 
      url: `${baseURL}${endpoint}`,
      data: method === 'POST' || method === 'PUT' ? data : undefined,
      params, 
      headers: {
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const response = await axios(config);
    return response.data; 
  } catch (error) {
    console.error('API call failed:', error);
    throw error.response ? error.response.data : error.message;
  }
};

export default makeApiCall;
