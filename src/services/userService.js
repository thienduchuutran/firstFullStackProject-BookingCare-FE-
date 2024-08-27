
import axios from "../axios"

//we wanna call our nodejs server in this function
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail, password: userPassword})
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
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

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-info-doctors', data)
}

const getDetailInfoDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const getExtraInfoDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`)
}

export { handleLoginApi, getAllUsers, 
        createNewUserService, deleteUserService, 
        editUserService, getAllCodeService, 
        getTopDoctorHomeService, getAllDoctors, 
        saveDetailDoctorService, getDetailInfoDoctor,
        saveBulkScheduleDoctor, getScheduleDoctorByDate,
        getExtraInfoDoctorById, getProfileDoctorById, postPatientBookAppointment,
        postVerifyBookAppointment, createNewSpecialty,getAllSpecialty }