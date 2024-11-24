import axios from "./api.js"

async function getAllSchedules(){
    const res = await axios.get('api/schedules')
    return res.data
}

const URLUploadFile = axios.defaults.baseURL + 'uploads/'


export default { getAllSchedules , URLUploadFile }

