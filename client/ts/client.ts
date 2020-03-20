import { createConnection } from 'net'
import { parseResponse } from './response'
import { HttpResponse, CLA } from './helpers'
import { parseCommandLineArguments } from './console'
import { getRequest } from './request'

const main = () => {

    // Parsing command line arguments

    let args: CLA
    try {
        args = parseCommandLineArguments()
    } catch(err) {
        console.error(err)
        return 0
    }

    // Creating client socket, initializing TCP connection with host and sending request

    const client = createConnection(
        args.url.port ? Number(args.url.port) : 80,
        args.url.hostname,
        () => {
            const request = getRequest(args)
            client.write(request)
        }
    )

    // Client events

    client.on('data', (data: Buffer) => {

        const { statusCode, statusMessage, content }: HttpResponse = parseResponse(data);

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
