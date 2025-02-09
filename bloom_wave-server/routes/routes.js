
export default async function routes(fastify, options) {
  const db = fastify.mongo.client.db('Informations');
  const signalCollection = db.collection('signals');

  fastify.get('/signals', async (_, reply) => {
    const signalCollection = await signalCollection.find().toArray();
    reply.send(signalCollection);
  });

  fastify.post('/signals', async (request, reply) => {
    console.log('okokokokok');
    const result = await signalCollection.insertOne(request.body);
    reply.code(201);
    return { id: result.insertedId };
  });
}