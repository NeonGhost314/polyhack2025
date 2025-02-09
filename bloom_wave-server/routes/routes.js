export default async function routes(fastify, options) {
  fastify.get('/hello', async (request, reply) => {
    return { message: 'Hello, from a separate route file!' };
  });

  fastify.get('/goodbye', async (request, reply) => {
    return { message: 'Goodbye, see you soon!' };
  });
}