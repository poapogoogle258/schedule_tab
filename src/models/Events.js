const  { Schema } = require('mongoose');
const db = require('../services/db');

const EventsSchema = new Schema({
    key : { type : String , required: true, unique: true },
    member : { type :  Schema.Types.ObjectId  , ref : "Members"},
    schedule : { type :  Schema.Types.ObjectId  , ref : "Schedules"},
    start : Date,
    end : Date,
    except : { type : Boolean , default : false },
    custom : { type : Boolean , default : false }

})

const Events = db.model('Events', EventsSchema);

module.exports = Events;