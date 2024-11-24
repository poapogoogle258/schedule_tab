require('dotenv').config()

const Fastify = require('fastify');

var db = require('./services/db')


async function bootstrap() {
  try {
    const server = Fastify();

    // use upload file in form-data
    server.register(require('@fastify/multipart'))
    
    // set CORS
    server.register(require('@fastify/cors'))

    // use static file 
    const path = require('node:path')
    server.register(require('@fastify/static'), {
      root: path.join(__dirname, '..' , "uploads" ),
      prefix: '/uploads/',
    })

    //set routes
    require('./routes/users')(server , {})
    require('./routes/schedules')(server , {})
    require('./routes/events')(server , {})

    await server.ready();

    const PORT = process.env.PORT || 3000;
    const address = await server.listen({port: PORT, host: '127.0.0.1'});
    console.log(`Server listening on address: ${address}`);

  } catch (err) {
    console.error(`Can't start server: ${err.message}`);
  }
}


bootstrap();