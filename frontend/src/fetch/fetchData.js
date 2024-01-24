export const fetchData = async (url, token) => {
    try {
      const response = await fetch('http://127.0.0.1:3000/api' + url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add other headers if needed
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message)
    }
}

export const postData = async (method, data, url, token) =>{
  try {
    const response = await fetch('http://127.0.0.1:3000/api'+url, {
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