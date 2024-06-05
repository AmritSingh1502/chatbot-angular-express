const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://chat-gpt-4-turbo1.p.rapidapi.com/',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'chat-gpt-4-turbo1.p.rapidapi.com'
  },
  data: {
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'user',
        content: 'Hello'
      }
    ]
  }
};

async function makeRequest() {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

makeRequest();
