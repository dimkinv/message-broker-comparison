import * as kafka from 'kafka-node';
import { KafkaClient } from 'kafka-node'
const Producer = kafka.Producer;
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({
    kafkaHost: 'localhost:9092'
});
const producer = new Producer(client);

producer.on('ready', (err) => {

    console.log(err);

    console.log('kafka:: connected');
    const messages = [
        {
            topic: 'test',
            messages: ['something', 'and another']
        }
    ];


    producer.send(messages, (err, data) => {
        console.log(err, data);
        console.log('kafka:: sent messages success!');
    });
});
//
// const client2 = new kafka.KafkaClient({
//     kafkaHost: 'localhost:9092'
// });
//
//
// const consumer = new Consumer(client2, [
//     {topic: 'test', partition: 0}
// ], {autoCommit: false});
//
// consumer.on('message', function (message) {
//     console.log(message);
// });
//
// console.log('consumer::on error');
// consumer.on('error', (err)=>{
//     console.log(err);
// })