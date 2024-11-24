const Events = require('../models/Events')


async function getAllEvents(request, reply){

    const results = await Events
        .find()
        .populate({path: 'member', select: '_id name nickName profile'})
        .populate({path: 'schedule', select: '_id name color'})
        .lean()

    reply.code(200)
    reply.send({
        statusCode : 200,
        message : "success",
        data : results
    })

}

module.exports = { getAllEvents }