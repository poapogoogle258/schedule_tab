import axios from "./api.js"

async function getAllEvents(){
    const res = await axios.get('api/events')
    return res.data
}

export default { getAllEvents }


