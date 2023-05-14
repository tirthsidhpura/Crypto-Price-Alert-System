const WebSocket = require('ws');
const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(client);


producer.on('ready',() => {
    console.log('kafka is ready to send')
})

function connectToBinanceWebSocket() {
  // Connect to Binance's WebSocket API for the BTC/USDT trading pair
  const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

  // Handle messages received from the WebSocket
  socket.on('message', (data) => {
    const message = JSON.parse(data);
    if (message.e === 'kline') {
      const candle = message.k;

      const payloads = [
          { topic: 'btc-price', messages: [`${candle.c}`], }
        ];
        producer.send(payloads, function (err, data) {
            if (err) {
                console.error('Error occurred while sending the message:', err);
            } else {
                console.log({close:candle.c})
          console.log('Message sent successfully:', data);
        }
      });

    }
  });

  // Send a message to subscribe to the WebSocket's candlestick data
  socket.on('open', () => {
    socket.send(JSON.stringify({
      method: 'SUBSCRIBE',
      params: ['btcusdt@kline_1m'],
      id: 1,
    }));
  });

  // Handle errors and reconnect the WebSocket after a delay
  socket.on('error', (error) => {
    console.error(`WebSocket error: ${error}`);
    setTimeout(() => {
      console.log('Reconnecting to WebSocket...');
      connectToBinanceWebSocket();
    }, 5000);
  });
}

// Call the function to connect to the WebSocket
connectToBinanceWebSocket();