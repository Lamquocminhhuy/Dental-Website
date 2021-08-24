import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail, password: userPassword})
}

const getAllUsers = (inputId) =>{
    return axios.get(`/api/get-all-users?id=${inputId}`)
}


const createNewUserService = (data) =>{
    console.log('api check', data)
    return axios.post('/api/create-new-user', data)

}

const deleteUserService = (userId) =>{
    // return axios.delete('/api/delete-user', {id: userId}) 
    return axios.delete('/api/delete-user', {
        data: {
            id : userId,

        }
    })
}


const editUserService = (inputData) =>{
    // return axios.delete('/api/edit-user', {id: userId}) 
    return axios.put('/api/edit-user', inputData)
}

const getAllCodeService = (inputtype) =>{
    return axios.get(`/api/allcode?type=${inputtype}`)
}

const getTopDoctorHomeService = () =>{
    return axios.get('api/top-doctor-home')
}


const getAllDoctor = () =>{
    return axios.get('api/get-all-doctors')
}


const saveDetailDoctorService = (data) =>{
    return axios.post('/api/save-infor-doctors', data)
}


const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}


const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}


const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}


const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}


const getAllService = () => {
    return axios.get('/api/service-chatbot')
}

const postPatientAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}


const postSlotAppointment = (data) => {
    return axios.post('/api/update-slot-schedule', data)
}

const getAllBooking = () => {
    return axios.get('/api/booking-list')
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService ,
    getAllDoctor,
    saveDetailDoctorService,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    getAllService,
    postPatientAppointment,
    postSlotAppointment,
    getAllBooking

}