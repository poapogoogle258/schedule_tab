import axios from "./api.js"

async function getAllUsers(){
    const res = await axios.get('api/users')
    return res.data
}

async function getUserByID(id){
    const res = await axios.get(`api/users/${id}`)
    return res.data
}

async function createNewMember(body) {
    const res = await axios.post('api/users', body )
    return res.data
}

async function updateMember(id,body) {
    const res = await axios.patch(`api/users/${id}`, body )

    return res.data
}

async function deleteMember(id) {
    const res = await axios.delete(`api/users/${id}`)

    return res.data
}

async function uploadProfile(image) {

    const data = new FormData()

    data.append('image', image); 

    const res = await axios.post('upload/profile',{
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
    })

    return res.data

}


function getURLProfile(filename){
    
    return axios.defaults.baseURL + 'uploads/' + filename

}

const URLUploadFile = axios.defaults.baseURL + 'upload/profile'


export default { getAllUsers ,getUserByID ,createNewMember ,updateMember , deleteMember , uploadProfile, getURLProfile , URLUploadFile }