import Signal from "../schema/signalSchema.js";

export default async function routes(fastify, options) {
  const db = fastify.mongo.client.db('Informations');
  const signalCollection = db.collection('signals');

  fastify.get('/signals', async (_, reply) => {
    const signalCollection = await signalCollection.find().toArray();
    reply.send(signalCollection);
  });

  fastify.post('/signals', { schema: { body: Signal } }, async (request, reply) => {
    console.log('okokokokok');
    
    try {
      const result = await signalCollection.insertOne(request.body);
      reply.code(201).send({ id: result.insertedId });
    } catch (err) {
      reply.code(500).send({ error: 'Failed to insert signal', details: err.message });
    }
  });
}