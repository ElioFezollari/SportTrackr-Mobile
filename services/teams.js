import axios from 'axios'
const baseUrl = 'http://192.168.2.11:5001/v1/team/'


const getTeamPlayers = async (credentials,teamId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(`${baseUrl}/players/${teamId}`, config);
      return response;
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  export default getTeamPlayers