// Import the framework and instantiate it
import Fastify from 'fastify'
import routes from './routes/routes.js'; // Import your routes

const fastify = Fastify({
  logger: true
})

fastify.register(routes);
// Declare a route
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}