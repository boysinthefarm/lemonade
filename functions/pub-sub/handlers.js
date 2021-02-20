const functions = require('firebase-functions');
const TOPIC = require('./topic');
const { logger } = require('./../utils');

const pubsub = functions.pubsub;

exports.helloPubSub = pubsub.topic(TOPIC.hello).onPublish((message) => {
  logger.log('---- helloPubSub ----', message.json);
  return null;
});
