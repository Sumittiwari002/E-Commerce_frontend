import axios from "axios";

const PROJECT_ID = "sumit-firebase-project";
// const BASE_URL = `${import.meta.env.VITE_API_FIREBASEPATH}/${PROJECT_ID}/databases/(default)/documents`;
console.log('ENV VALUE:', import.meta.env.VITE_API_FIREBASEPATH);
   const BASE_URL = `${import.meta.env.VITE_API_FIREBASEPATH}/${PROJECT_ID}/databases/(default)/documents`;


const firestoreApi = axios.create({
  baseURL: BASE_URL,
  
});
export default firestoreApi;
