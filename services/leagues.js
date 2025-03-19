import axios from 'axios'
const baseUrl = 'http://10.0.0.62:5000/v1/league/'


const getLeagues = async (credentials) => {
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(baseUrl, config);
      return response;
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

const getLeague = async (credentials,id) =>{
  const config = {
    headers: {
      Authorization: `Bearer ${credentials}`, 
    },
  };
  
  try {
    const response = await axios.get(`${baseUrl}/${id}` , config);
    return response;
  } catch (error) {
    console.error('Error fetching leagues:', error);
  }
}

const getLeagueList = async (credentials) => {

  const config = {
    headers: {
      Authorization: `Bearer ${credentials}`, 
    },
  };
  
  try {
    const response = await axios.get(baseUrl+"leagues-by-owner", config);
    return response;
  } catch (error) {
    console.error('Error fetching leagues:', error);
  }
};

const createLeague = async (credentials, formData) => {
  const config = {
    headers : {
      Authorization : `Bearer ${credentials}`,
      "Content-Type": "multipart/form-data",
    }
  }

  const response = await axios.post(baseUrl, formData, config);
  return response;

}
const getLeagueStats = async(credentials)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${credentials}`, 
        },
      };
    
      const response = await axios.get(baseUrl + 'stats',config);
      return response;
    
}

export {getLeagues,getLeague,getLeagueList, createLeague,getLeagueStats}