import axios from 'axios'
const baseUrl = 'http://192.168.2.11:5001/v1/match/'

const getMatchesByTeamId = async (credentials,teamId) =>{
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(`${baseUrl}team/${teamId}` , config);
      return response;
    } catch (error) {
      console.error('Error fetching matches:', error);
    }
  }
  
 
const getHighlightsByUser = async (credentials,userId) =>{
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(`${baseUrl}highlight/${userId}` , config);
      return response;
    } catch (error) {
      console.error('Error fetching highlight:', error);
    }
  }

  const getGoalHighlights = async (credentials) =>{
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(`${baseUrl}goal-highlight` , config);
      return response;
    } catch (error) {
      console.error('Error fetching goal highlight:', error);
    }
  }
   
  const getSaveHighlights = async (credentials) =>{
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(`${baseUrl}save-highlight` , config);
      return response;
    } catch (error) {
      console.error('Error fetching save highlight:', error);
    }
  }
  const getDribbleHighlights = async (credentials) =>{
    const config = {
      headers: {
        Authorization: `Bearer ${credentials}`, 
      },
    };
    
    try {
      const response = await axios.get(`${baseUrl}dribble-highlight` , config);
      return response;
    } catch (error) {
      console.error('Error fetching dribble highlight:', error);
    }
  }

  export {getMatchesByTeamId, getHighlightsByUser, getGoalHighlights, getDribbleHighlights, getSaveHighlights}