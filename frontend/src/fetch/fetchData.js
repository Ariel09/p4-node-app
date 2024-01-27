
export const fetchData = async (method, url, token) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(apiUrl + '/api' + url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add other headers if needed
        },
      });
      
      return response;
    } catch (error) {
      console.error(error.message)
    }
}

export const postData = async (method, url, token, data) =>{
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(apiUrl + '/api' + url, {
      method: method,      
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        // Add any other headers required by your Pocketbase API
      },
      body: JSON.stringify(data)
    });

    return response;
  } catch (error) {
    console.error('Error: ', error.message)
  }
}