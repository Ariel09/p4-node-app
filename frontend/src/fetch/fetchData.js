export const fetchData = async (method, url, token) => {
    try {
      const response = await fetch('http://127.0.0.1:3000/api' + url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          // Add other headers if needed
        },
      });
      console.log(response)
      return response;
    } catch (error) {
      console.error(error.message)
    }
}

export const postData = async (method, url, token, data) =>{
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