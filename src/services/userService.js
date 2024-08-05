
import axios from "../axios"

//we wanna call our nodejs server in this function
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail, password: userPassword})
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    console.log('check data from service: ', data)
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
          id: userId
        }
      })
    }

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

const getAllCodeService = (inputType) => {
    console.log('input type: ',inputType)
    return axios.get(`/api/allcode?id=${inputType}`)
}

export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, getAllCodeService}