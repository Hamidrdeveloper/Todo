import axios from "axios";

export default axios.create({
  baseURL: 'https://185.126.200.101:4005',
  headers: {
    'Accept': 'application/json', 
    'HTTP_ACCEPT_LANGUAGE':'en',
    'referer': 'https://tobeclean.de',  
    'Origin': 'https://tobeclean.de',
    'Content-Type': 'application/json'
  }
});