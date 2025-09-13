import axios from 'axios'

const API_URL = `http://localhost:8080/api/auth/login`

// Login API function
export const login = async (credentials) => {
  try {
    const response = await axios.post(API_URL, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('---------------------------->login response: ', response)
    return response // Returns the response object (which contains the token)
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}
