const net = require('net');
const response = require('./response');
var RequestType;
(function (RequestType) {
    RequestType["get"] = "GET";
    RequestType["delete"] = "DELETE";
})(RequestType || (RequestType = {}));
const requestTypes = [RequestType.get, RequestType.delete];
const main = () => {
    // Reading command line arguments
    if (process.argv.length < 2) {
        return 0;
    }
    // Parsing command line url
    let parsedUrl;
    try {
        parsedUrl = new URL(process.argv[2]);
    }
    catch (err) {
        console.log("Invalid url");
        return 0;
    }
    let type = RequestType.get;
    if (process.argv.length > 3 && requestTypes.includes(process.argv[3])) {
        type = process.argv[3];
    }
    // Creating socket & connecting to host & sending request
    const client = net.createConnection(parsedUrl.port ? Number(parsedUrl.port) : 80, parsedUrl.hostname, () => {
        client.write(`${type} ${parsedUrl.pathname} HTTP/1.1\r\nHost: ${parsedUrl.hostname}\r\n\r\n`);
    });
    // Client events
    client.on('data', (data) => {
        const res = response.parseResponse(data);
        if (res.status == 200) {
            console.log(res.content);
        }
        client.end();
    });
    client.on('end', () => {
        console.log('disconnected from server');
    });
    client.on('error', (data) => {
        console.log(data);
    });
};
main();
