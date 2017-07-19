import * as kafka from 'kafka-node';
import {KafkaClient} from 'kafka-node'
const Producer = kafka.Producer;
const client = new kafka.KafkaClient('localhost:9092');
const producer = new Producer(client);

producer.on('ready', () => {
    console.log('kafka:: connected');
    const messages = [
        {
            topic: 'test',
            messages: ['something', 'and another']
        }
    ];

    producer.send(messages, ()=>{
        console.log('kafka:: sent messages success!');
    });
});