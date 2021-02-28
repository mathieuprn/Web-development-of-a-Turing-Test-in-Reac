import axios from "axios";

/**
 * API config for all the application
 */
export default axios.create({
    baseURL: "http://localhost:8000/api/",
    headers: {
    'Authorization': `Api-Key ${process.env.REACT_APP_API_KEY}`
  }

});
