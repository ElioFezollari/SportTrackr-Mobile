import axios from 'axios'
const baseUrl = 'http://10.16.34.229:5000/v1/auth/'


const register = async(credentials,token)=>{
  const response = await axios.post(baseUrl + "register/" + token,credentials,{
    withCredentials:true
  })
  return response
}

const login = async (credentials) =>{
  const response = await axios.post(baseUrl + "login",credentials,{
    withCredentials:true
  })
  return response
}

const logout = async () => {
  try {
    const response = await axios.post(baseUrl + 'logout', {}, { withCredentials: true });
    return response;
  } catch (error) {
    return error.response || { status: 500, message: "Internal error" };
  }
};
const refreshToken = async () => {
  const response = await axios.get(baseUrl + "refresh",{
    withCredentials:true,
  });
  console.log(response)
  return response.data
}

const sendVerificationEmail = async(email) => {
  
  const response = await axios.post(baseUrl + 'verify', email, {
    withCredentials: true,
    headers: { 
      'Content-Type': 'application/json',
      'clientType': 'mob'
    } 
  });
  return response;
}

const sendForgotPasswordEmail = async(email) => {
  const response = await axios.post(baseUrl + 'forgot', email);
  return response;
}

const resetPassword = async(token, data) => {
  const response = await axios.post(baseUrl + `reset/${token}`, data);
  return response;
}

export {login,refreshToken,register,logout, sendVerificationEmail, sendForgotPasswordEmail, resetPassword}