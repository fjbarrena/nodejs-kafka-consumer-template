const { Kafka } = require('kafkajs');

const argv = require('yargs/yargs')(process.argv.slice(2))
  .usage('Usage: $0 [options]')
  .option('topic', {
    alias: 't',
    description: 'the topic you want to subscribe',
    type: 'string'
  })
  .option('from-beginning', {
    alias: 'fb',
    description: 'Retrieve from the beggining or not',
    type: 'boolean',
    default: true
  })
  .option('group', {
    alias: 'g',
    description: 'the group of consumers to which this consumer belongs',
    type: 'string',
  })
  .option('client', {
    alias: 'c',
    description: 'the client id',
    type: 'string',
  })
  .option('brokers', {
    alias: 'b',
    description: 'the kafka brokers to connect, i.e: localhost:9092,localhost:9093,localhost:9094',
    type: 'string',
  })
  .demandOption(['topic', 'brokers', 'client', 'group'])
  .help('h')
  .alias('h', 'help')
  .epilog('Follow me on Twitter @DogDeveloper ;)')
  .argv;

const kafka = new Kafka({
  clientId: argv.client,
  brokers: argv.brokers.split(',')
});

const consumer = kafka.consumer({ groupId: argv.group})

const run = async() => {
	await consumer.connect()
	await consumer.subscribe({ topic: argv.topic, fromBeginning: argv['from-beginning'] })

	await consumer.run({
	  eachMessage: async ({ topic, partition, message }) => {
      	    // PROCESS STUFF - Add here your code to process the incoming message 
            const receivedString = new Buffer.from(message.value).toString();
	    
            console.log(receivedString);
	  },
	});
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.map(type => {
  process.on(type, async e => {
    try {
      console.log(`process.on ${type}`)
      console.error(e)
      await consumer.disconnect()
      process.exit(0)
    } catch (_) {
      process.exit(1)
    }
  })
})

signalTraps.map(type => {
  process.once(type, async () => {
    try {
      await consumer.disconnect()
    } finally {
      process.kill(process.pid, type)
    }
  })
})

