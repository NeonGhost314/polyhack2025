export default async function routes(fastify, _) {
  fastify.get('/polution', async (_, reply) => {
    reply.send( 'polution') ;
  });

  fastify.get('/fish', async (_, reply) => {
    reply.send('fish');
  });

  fastify.get('/courant', async (_, reply) => {
    reply.send('courant' );
  });
}