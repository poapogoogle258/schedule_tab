const  { Schema } = require('mongoose');
const db = require('../services/db')

const ScheduleSchema = new Schema({
    name : String,
    image : { type : String , default : "default_schedule.jpeg"},
    disable : { type : Boolean , default : false },
    priority : { type : Number , default : 10 },
    numbers : { type : Number , default : 1  },
    color : String,
    description : String,
    start : Date,
    end : { type : String , default : "never"},
    expects : [ Date ],
    time : { start : String , end : String },
    recurrence : {
        _id: false,
        freq : String,
        interval : Number,
        wkst : String,
        bymonth : [String],
        byweekday : [String]
    },
    members : [{
        type : Schema.Types.ObjectId,
        ref : 'Members'
    }],
})

const Schedules = db.model('Schedules', ScheduleSchema);

module.exports = Schedules;