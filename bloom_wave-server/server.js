import Fastify from 'fastify'
import routes from './routes/routes.js';
import fastifyMongo from "@fastify/mongodb";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({
  logger: true
})


await fastify.register(fastifyMongo, {
  forceClose: true,
  url: process.env.MONGO_URI,
});

fastify.register(routes);
fastify.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

try {
  await fastify.listen({ port: 5000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}