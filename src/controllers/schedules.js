const Schedules = require('../models/Schedules')
const Events = require('../models/Events')



async function getAllSchedules(request ,reply){
    const results = await Schedules.find().populate({path: 'members', select: '_id name nickName profile'}).lean()

    reply.code(200)
    reply.send({
        statusCode : 200 ,
        message : 'success',
        data : results
    })
}

async function createNewSchedule(request ,reply){
    
    const newSchedule = new Schedules(request.body)
    await newSchedule.save()

    reply.code(201)
    reply.send({
        statusCode : 201,
        message : "success"
    })

}

async function deleteSchedule(request , reply){

    const result = await Schedules.findOneAndDelete({ _id : request.params.id })
    if(result){
        reply.code(200)
        reply.send({
            statusCode : 200,
            message : "success"
        })
    }else{
        reply.code(401)
        reply.send({
            statusCode : 401,
            message : "not found Schedule id"
        })
    }

}


class Queue{
    constructor(itemslist){
        this.itemslist = itemslist
        this.length = itemslist.length
        this.remain = []
        this.queue_now = itemslist
    }

    addRemain(new_item){
        if(this.remain.includes(new_item) === false){
            this.remain.push(new_item)
        }

        return
    }
        
    next(){
        if(this.remain.length > 0){
            return this.remain.shift()
        }
        else if(this.queue_now.length === 1){
            const result = this.queue_now.shift()
            this.queue_now = this.itemslist
            return result
        }else{
            return this.queue_now.shift()
        }
    }

}

async function ganarateTaskCalendar(request, reply){

    // const Events = require('../models/Events')
    // await Events.deleteMany()
  
    const { datetime, RRule } = require('rrule');
  
    const schedules = await Schedules.find().populate({path: 'members', select: '_id name nickName profile'}).lean()
  
    for(let i = 0 ; i < schedules.length ; i++){
  
        const start = datetime(2024, 11, 1, 0, 0, 0)
        const end = datetime(2024, 11, 30, 23, 59, 59)
  
        const byweekday = schedules[i].recurrence.byweekday.map((d) => RRule[d])
        
        const option = {
          freq:   RRule[schedules[i].recurrence.freq],
          byweekday: byweekday,
          dtstart: start,
          count : 31,
          until: end
        }
  
        let im = 0
        const lenM = schedules[i].members.length
  
        const rule = new RRule(option)
        
        const events = rule.all()
        for(let j = 0 ; j < events.length ; j++){
            const [ startH , startM , startS ] = schedules[i].time.start.split(':')
            const [ endH , endM , endS ] = schedules[i].time.end.split(':')

            const start = new Date(events[j].setHours(startH, startM, startS))
            const end = new Date(events[j].setHours(endH , endM , endS ))

            const newEvent = new Events({
                    key : schedules[i].members[im % lenM]['_id'].toString() + start.valueOf() + end.valueOf(),
                    member : schedules[i].members[im++ % lenM]['_id'].toString(),
                    schedule : schedules[i]['_id'].toString(),
                    start : start,
                    end : end
                })

            await newEvent.save()
        }
  
    }
  
  }



module.exports = { getAllSchedules , createNewSchedule , deleteSchedule }