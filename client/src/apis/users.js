const axios = require('axios');

export const createUser = async (user) => {
    try {
        const response = await axios.post('/api/users', user);
      } catch (error) {
        console.error(error);
      }
}
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`/api/users/${id}`);
        return JSON.parse(response.data);
      } catch (error) {
        console.error(error);
      }
}