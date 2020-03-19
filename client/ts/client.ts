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

    // Creating client socket, initializing TCP connection with host and sending request

    const client = createConnection(
        parsedUrl.port ? Number(parsedUrl.port) : 80,
        parsedUrl.hostname,
        () => {
            client.write(`${cla.request} ${parsedUrl.pathname} HTTP/1.1\r\nHost: ${parsedUrl.hostname}\r\n\r\n`)
        }
    )

    // Client events

    client.on('data', (data: Buffer) => {

        const { statusCode, statusMessage, content } = parseResponse(data);

        console.log(`\nStatus code: ${statusCode}\nStatus message: ${statusMessage}\n`)
        
        if(content) {
            console.log(`Content:\n${content}\n`)
        }

        client.end()
    })

    client.on('error', (err: Error) =>  {
        console.error(err)
    })
}

main()
