import * as amqp from 'amqplib';

async function init(){
    const conn = await amqp.connect('amqp://localhost');
    const ex = 'topic_logs';

    const ch = await conn.createChannel();
    ch.assertExchange(ex, 'topic', {durable: false});
    const q = await ch.assertQueue('', {exclusive: true});

    console.log(' [*] Waiting for logs. To exit press CTRL+C');
    ch.bindQueue(q.queue, ex, '#');

    ch.consume(q.queue, function (msg) {
        console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
    }, {noAck: true});
}

init();