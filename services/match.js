import axios from 'axios'
const baseUrl = 'http://192.168.0.207:5001/v1/match/'

const getMatchesByUser = async (credentials,userId) =>{
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(`${baseUrl}user/${userId}` , config);
      return response;
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  }
  

  export {getMatchesByUser}