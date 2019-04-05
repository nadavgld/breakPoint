const axios = require('axios');
import config from '../config.js'

export const startGame = async (id, players, token) => {
  try {
    const response = await axios.post(config.server_url + `/api/matches`, {
      deviceId: id,
      players
    }, {
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

export const getmatchById = async (id, token) => {
  try {
    const response = await axios.get(config.server_url + `/api/matches/${id}`, {
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