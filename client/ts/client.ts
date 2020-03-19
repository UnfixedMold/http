import { createConnection } from 'net'
import { parseResponse, HttpResponse } from './response'
import { CLA, parseCommandLineArguments} from './console'

const main = () => {

    // Parsing command line arguments

    let cla: CLA
    let parsedUrl: URL
    try {

        cla = parseCommandLineArguments()
        parsedUrl = new URL('http://' + cla.url);

    } catch(err) {
        console.error(err)
        return 0
    }    

    // Creating socket, initializing TCP connection and sending request

    const client = createConnection(
        parsedUrl.port ? Number(parsedUrl.port) : 80,
        parsedUrl.hostname,
        () => {
            client.write(`${cla.request} ${parsedUrl.pathname} HTTP/1.1\r\nHost: ${parsedUrl.hostname}\r\n\r\n`)
        }
    )

    // Client events

    client.on('data', (data: Buffer) => {

        const res: HttpResponse = parseResponse(data);

        if(res.status >= 200 && res.status < 300 ) {
            console.log(res.content)
        }
        
        client.end();
    })

    client.on('error', (err: Error) =>  {
        console.error(err);
    })
}

main()
