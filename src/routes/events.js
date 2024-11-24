const EventsController = require('../controllers/event')


module.exports = (fastify, option) => {

    fastify.get('/api/events' , EventsController.getAllEvents)
    
}