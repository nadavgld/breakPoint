const axios = require('axios');
import config from '../config.js'


export const getAllDevices = async () => {
    try {
        const response = await axios.get('/api/devices');
        return JSON.parse(response.data);
      } catch (error) {
        console.error(error);
      }
}
export const getDeviceById = async (id) => {
    try {
        const response = await axios.get(`/api/devices/${id}`);
        return JSON.parse(response.data);
      } catch (error) {
        console.error(error);
      }
}