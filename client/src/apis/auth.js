import config from '../config.js'
const axios = require('axios');

export const loginUser = async (user) => {
    try {
        const response = await axios.post(config.server_url + '/api/auth', user);

        return response.data;
      } catch (error) {

        return {
          msg: 'Could not match credentials'
        }
      }
}
