const net = require('net')
const response = require('./response')

enum RequestType {
    get = 'GET',
    delete = 'DELETE'
}

const requestTypes: String[] = [RequestType.get, RequestType.delete]

const main = () => {

    // Reading command line arguments

    if (process.argv.length < 2) {
        return 0;
    }

    // Parsing command line url

    let parsedUrl: URL; 

    try {
        parsedUrl = new URL(process.argv[2]);
    } catch(err) {
        console.log("Invalid url")
        return 0;
    }
    
    let type: String = RequestType.get;

    if(process.argv.length > 3 && requestTypes.includes(process.argv[3])) {
        type = process.argv[3]
    }

    // Creating socket & connecting to host & sending request

    const client = net.createConnection(
        parsedUrl.port ? Number(parsedUrl.port) : 80,
        parsedUrl.hostname,
        () => {
            client.write(`${type} ${parsedUrl.pathname} HTTP/1.1\r\nHost: ${parsedUrl.hostname}\r\n\r\n`);
        }
    );

    // Client events

    client.on('data', (data: Buffer) => {

        const res = response.parseResponse(data);

        if(res.status == 200 ) {
            console.log(res.content)
        }
        
        client.end();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });

    client.on('error', (data: Error) =>  {
        console.log(data);
    });
};

main();
