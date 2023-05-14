# Crypto-Price-Alert-System
A real time price alert system using Apache kafka and nodejs

To start first start kafka server

then websocket.js with node websocket.js
after starting it 

start a server.js file and create the alert with API endpoint
this will create a child process and for each user it create a individual process, all the child process listens to the kafka topic named btc-price

once threshold hits it consoles the output.


In websocket.js file, connect to websocket to get the real time price of btc from binance server. and produce the kafka topiic.

![image](https://github.com/tirthsidhpura/Crypto-Price-Alert-System/assets/87744581/532dc6e9-0ac2-4be3-a9e0-91c5ef6c58e3)

postman request over view 

![image](https://github.com/tirthsidhpura/Crypto-Price-Alert-System/assets/87744581/89588ce0-91e8-4476-9425-d0e3affb105e)

