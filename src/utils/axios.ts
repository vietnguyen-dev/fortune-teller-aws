import axios from "axios";

const ai = axios.create({
    baseURL: 'https://api.vyro.ai/v1/imagine/api/generations',
    // timeout: 1000,
    headers: {
        // 'X-Custom-Header': 'foobar',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AI_KEY}`  ,
        "Content-Type": "multipart/form-data",        
    }
  });

export default ai