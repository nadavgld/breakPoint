const axios = require('axios');
import config from '../config.js'

export const createUser = async (user, token) => {

  try {
    const response = await axios.post(config.server_url + '/api/users', user, {
      headers: {
        "x-auth-token": token
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getUserById = async (id, token) => {
  try {
    const response = await axios.get(config.server_url + `/api/users/${id}`, {
      headers: {
        "x-auth-token": token
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}