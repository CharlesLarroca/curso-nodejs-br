import axios from 'axios'

//configuração para chamar a api
export default axios.create({
  baseURL: 'http://localhost:5000',
}) 