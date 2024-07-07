
import axios from "../axios"

//we wanna call our nodejs server in this function
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail, password: userPassword})
}

export { handleLoginApi }