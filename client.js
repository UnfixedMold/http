const net = require('net');
const { host, port } = require('./helpers')

// Create socket & connect to host

const client = net.createConnection(port, host, () => {
  client.write(`GET / HTTP/1.1\r\nHost: ${host}\r\n\r\n`);
});

// Client events

client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
});

client.on('error', (data) => {
  console.log(data)
});


