const axios = require('axios');
import config from '../config.js'
<<<<<<< HEAD
=======

>>>>>>> dab229ee2011b69bec1e5fa047b852af1455c018

export const getAllDevices = async () => {
  try {
    const response = await axios.get(config.server_url + '/api/devices');
    return JSON.parse(response.data);
  } catch (error) {
    console.error(error);
  }
}
export const getDeviceById = async (id) => {
  try {
    const response = await axios.get(config.server_url + `/api/devices/${id}`);
    return JSON.parse(response.data);
  } catch (error) {
    console.error(error);
  }
}