const Members = require('../models/Members')

const fs = require('node:fs')
const { pipeline } = require('node:stream/promises')

async function getAllUser(request, reply) {

    const members = await Members.find().lean()

    reply.code(200)
    reply.send({
        statusCode : 200 ,
        message : 'success',
        data : members
    })
    
}

async function getUser(request, reply){

    const member = await Members.findOne({ _id : request.params.id }).lean()

    if(member){
        reply.code(200)
        reply.send({
            statusCode : 200,
            message : "success",
            data : member
        })
    }else {
        reply.code(401)
        reply.send({
            statusCode : 401,
            message : "not fount this member"
        })
    }

}

async function uploadImageProfile( request, reply ){

    const data = await request.file()
    const sname = {
      "image/jpeg" : "jpeg",
      "image/png" : "png"
    }
    if(!data.mimetype in sname){
      reply.code(400)
      reply.send({
        statusCode : 400,
        message : `not subport file ${data.mimetype}`
      })
    }
    const filename = `profile${Date.now().valueOf()}.${sname[data.mimetype]}`
    await pipeline(data.file, fs.createWriteStream(`./uploads/${filename}`))

    reply.code(200)
    reply.send({
      statusCode : 200 ,
      message : "success",
      filename : filename
    })
    
}

async function createNewMember(request, reply) {
    
    const newMember = new Members(request.body)
    await newMember.save()

    reply.code(201)
    reply.send({
        statusCode : 201 ,
        message : "success"
    })
    
}

async function editUserMember(request, reply) {

    const member = await Members.findOne({ _id : request.params.id })

    if(member){
        member.set(request.body)
        await member.save()

        reply.code(200)
        reply.send({
            statusCode : 200 ,
            message : "success"
        })

    }else{
        reply.code(401)
        reply.send({
            statusCode : 401 ,
            message : "not found member id"
        })
    }

}

async function deleteUserMember(request, reply){

    const member = await Members.exists({ _id : request.params.id })

    if(member){
        await Members.deleteOne({ _id : request.params.id })

        reply.code(200)
        reply.send({
            statusCode : 200 ,
            message : "success"
        })

    }else{
        reply.code(401)
        reply.send({
            statusCode : 401 ,
            message : "not found member id"
        })
    }

}


async function addLeaveDateMember(request, reply){
    const member = await Members.fineOne({ _id : request.params.id })
    if(!!member){
        // TO DO : add date leave
        }else{
        reply.code(401)
        reply.send({
            statusCode : 401,
            message : "not found member id"
        })
    }
}


module.exports = { getAllUser , uploadImageProfile , getUser, createNewMember, editUserMember , deleteUserMember}