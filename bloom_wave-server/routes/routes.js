import mongoose from 'mongoose';
//import signalSchema from 'signalScema.js';

export default async function routes(fastify, options) {
  const db = fastify.mongo.client.db('Informations');
  const fishCollection = db.collection('fish');
  const pollutionCollection = db.collection('pollution');
  const courantCollection = db.collection('courant');

  fastify.get('/pollution', async (_, reply) => {
    const pollutionData = await pollutionCollection.find().toArray();
    reply.send(pollutionData);
  });

  fastify.post('/pollution', async (request, reply) => {
    console.log('okokokokok');
    const result = await pollutionCollection.insertOne(request.body);
    reply.code(201);
    return { id: result.insertedId };
  });

  fastify.get('/fish', async (_, reply) => {
    const fishData = await fishCollection.find().toArray();
    reply.send(fishData);
  });

  fastify.post('/fish', async (request, reply) => {
    console.log('okokokokok');
    const result = await fishCollection.insertOne(request.body);
    reply.code(201);
    return { id: result.insertedId };
  });


  fastify.get('/courant', async (_, reply) => {
    const courantData = await courantCollection.find().toArray();
    reply.send(courantData);
  });

  fastify.post('/courant', async (request, reply) => {
    console.log('okokokokok');
    const result = await courantCollection.insertOne(request.body);
    reply.code(201);
    return { id: result.insertedId };
  });
}