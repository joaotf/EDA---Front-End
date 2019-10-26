import axios from 'axios'

const api = axios.create({
    baseURL: "https://eda--api.herokuapp.com/api"
})    


export default api;