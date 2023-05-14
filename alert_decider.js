// monitor.js

// Parse the command-line arguments
const [userId, thresholdPrice] = process.argv.slice(2);

const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new kafka.Consumer(
  client,
  [{ topic: 'btc-price', partition: 0 }],
  { groupId: 'my-group' }
);

consumer.on('message', function (message) {
    // console.log('Received message:', message);
    // console.log(message);
    price = message['value']
    if (+price >= thresholdPrice) {
        console.log(`User ${userId} threshold reached: price is ${price} and set price is ${thresholdPrice}`);
        process.kill(process.pid);
    } else {
      process.send(price);
    }

    
  });
  
  consumer.on('error', function (err) {
    console.error('Error occurred while initializing the consumer:', err);
  });





// Monitor the price of the stock for this user



// const intervalId = setInterval(() => {
//     // fetch current price from API or database for this user
//     // const price = getCurrentPriceForUser(userId);
//     const price = Math.random();
    
//     console.log(`User ${userId} threshold reached: price is ${price}`);
//     if (price >= thresholdPrice) {
//       console.log(`User ${userId} threshold reached: price is ${price}`);
//     // Threshold reached, output to console and kill the child process
//     clearInterval(intervalId);
//     process.kill(process.pid);
//   } else {
//     // Send the price to the parent process
//     process.send(price);
//   }
// }, INTERVAL_MS);
