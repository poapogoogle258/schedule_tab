const MembersController = require('../controllers/members')

module.exports = async function (fastify, opts = {}) {
    
    fastify.get('/api/users',  MembersController.getAllUser )

    fastify.post('/api/users', MembersController.createNewMember )

    fastify.get('/api/users/:id',  MembersController.getUser )

    fastify.patch('/api/users/:id', MembersController.editUserMember )

    fastify.delete('/api/users/:id', MembersController.deleteUserMember )
    
    fastify.post('/upload/profile' ,  MembersController.uploadImageProfile )

}