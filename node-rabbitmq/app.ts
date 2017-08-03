import * as amqp from 'amqplib';
import { Channel } from "amqplib";

const ex = 'topic_logs';
const args = process.argv.slice(2);
const key = (args.length > 0) ? args[0] : 'anonymous.info';
const msg = args.slice(1).join(' ') || 'Hello World!';

let publishMessage = function (ch: Channel) {


    ch.assertExchange(ex, 'topic', {durable: false});
    ch.publish(ex, key, new Buffer(msg));
};
async function init() {
    const connection = await amqp.connect(['amqp://localhost:15672', 'amqp://localhost:15673', 'amqp://localhost:15674']);
    const ch = await connection.createChannel();

    setInterval(() => {
        publishMessage(ch);
    }, 0);

}

init();
amqp.connect('amqp://localhost', (err, conn) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }


});