export const fetchData = async (url) => {
    try {
      const response = await fetch('http://127.0.0.1:3000/api' + url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message)
    }
}

export const postData = async (method, data, url) =>{
  try {
    const response = await fetch('http://127.0.0.1:3000/api'+url, {
      method: method,      
      headers: {
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