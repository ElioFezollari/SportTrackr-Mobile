import axios from 'axios'
const baseUrl = 'http://192.168.2.57:5000/v1/team/'

const getTeamPlayersByLeague = async (leagueId, credentials) =>{
    const config = {
        headers: {
          Authorization: `Bearer ${credentials}`, 
        },
      };
      
      try {
        const response = await axios.get(baseUrl + 'team-players/' + leagueId, config);
        return response;
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
}

const joinTeam = async (teamId, data, credentials) => {
    const config = {
        headers: {
            Authorization: `Bearer ${credentials}`,
        }
    };

    try {
        const response = await axios.post(baseUrl + 'join-team/' + teamId, data, config);
        return response;
    } catch (e) {
        // console.error("joinTeam Error:", e.response?.data || e.message);
        // throw e;
    }
};

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

export { getTeamPlayersByLeague, joinTeam, getTeamPlayers }