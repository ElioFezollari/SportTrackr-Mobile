import axios from 'axios'
const baseUrl = 'http://10.0.0.62:5000/v1/user/'

const getUserProfile = async (credentials,id) =>{
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(`${baseUrl}/mobile/${id}` , config);

      return response;
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  }

  export {getUserProfile}