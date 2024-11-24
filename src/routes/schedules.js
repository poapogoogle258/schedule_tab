const SchedulesController = require('../controllers/schedules')

module.exports = async(fastify, opts = {}) => {

    fastify.get('/api/schedules' , SchedulesController.getAllSchedules )

    fastify.post('/api/schedules' , SchedulesController.createNewSchedule )

    fastify.delete("/api/schedules/:id" , SchedulesController.deleteSchedule )

    // fastify.get('/api/test' , SchedulesController.manualCalendar)

}