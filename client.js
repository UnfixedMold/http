const net = require('net');

const client = net.createConnection(80, "www.example.com", () => {
  // 'connect' listener.
  console.log('connected to server!');
  client.write("GET / HTTP/1.1\r\nHost: www.example.com\r\n\r\n");
});

client.on('data', (data) => {
  console.log("gavau")
  console.log(data.toString());
  client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
});

client.on('error', (data) => {
    console.log('erroras')
    console.log(data)
  });


