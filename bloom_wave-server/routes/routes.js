
export default async function routes(fastify, options) {
  const db = await fastify.mongo.client.db('Informations');
  const signalCollection = await db.collection('signals');
  
  fastify.get('/signals/fish', async (_, reply) => {
    const signalCollectionFish = await signalCollection.find({type:"fish"}).toArray();
    reply.send(signalCollectionFish);
  });
  fastify.get('/signals/courant', async (_, reply) => {
    const signalCollectionCourant = await signalCollection.find({type:"courant"}).toArray();
    reply.send(signalCollectionCourant);
  });

  fastify.get('/signals/pollution', async (_, reply) => {
    const signalCollectionPollution = await signalCollection.find({type:"pollution"}).toArray();
    reply.send(signalCollectionPollution);
  });

  fastify.get('/signals', async (_, reply) => {
    const signalCollectionDB = await signalCollection.find().toArray();
    reply.send(signalCollectionDB);
  });

  fastify.post('/signals', async (request, reply) => {
    const result = await signalCollection.insertOne(request.body);
    reply.code(201);
    return { id: result.insertedId };
  });
}