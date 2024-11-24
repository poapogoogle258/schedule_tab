const  { Schema } = require('mongoose');
const db = require('../services/db')


const MembersSchema = new Schema({

    name : String,
    nickName : String,
    profile : {type : String , default: 'default.jpeg' },
    description : String,
    tag : [String],
    address : {
        phone : String,
        line : String,
        email : String
    },
    leave : [{ start : Date , end : Date , description : String }]

})

const Members = db.model('Members', MembersSchema);

module.exports = Members;