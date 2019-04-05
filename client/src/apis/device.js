const axios = require('axios');
import config from '../config.js'

export const getAllDevices = async (token) => {
  try {
    const response = await axios.get(config.server_url + '/api/devices', {
      headers: {
        "x-auth-token": token
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const getDeviceById = async (id, token) => {
  try {
    const response = await axios.get(config.server_url + `/api/devices/${id}`, {
      headers: {
        "x-auth-token": token
      }
    });
    return response.data;

  } catch (error) {
    console.error(error);
  }
}

export const joinDeviceLobby = async (id, token) => {
  try {
    const response = await axios.post(config.server_url + `/api/devices/${id}/lobby`, {} , {
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