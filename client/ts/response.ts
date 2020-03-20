import { StatusLine, Info, HttpResponse, Header, splitBufferBy } from './helpers'

const parseStatusLine = (buffer: Buffer): StatusLine => {

    const [protocol, statusInfo] = splitBufferBy(buffer, ' ')

    const [statusCode, statusMessage] = splitBufferBy(statusInfo, ' ')

    return { 
        protocol: protocol.toString(),
        statusCode: Number(statusCode.toString()),
        statusMessage: statusMessage.toString()
    }
}

const parseHeaders = (buffer: Buffer): Header[] => {

    const delimeter = '\r\n'

    let headers = []

    let tempBuffer = buffer

    while(tempBuffer.includes(delimeter)) {
        
        const [ header, leftover ] = splitBufferBy(tempBuffer, delimeter)

        headers.push(header)
        tempBuffer = leftover
    }

    return headers.map(header => {

        const [name, value] = splitBufferBy(header, ": ")

        return {
            name: name.toString(),
            value: value.toString()
        }
    })
}

const parseInfo = (buffer: Buffer): Info => {

    const [statusLine, headerFields] = splitBufferBy(buffer, '\r\n')

    return {
        ...parseStatusLine(statusLine),
        headers: parseHeaders(headerFields)
    }
}

export const parseResponse = (buffer: Buffer): HttpResponse => {
    const [info, content] = splitBufferBy(buffer, '\r\n\r\n')

    return {
        ...parseInfo(info),
        content: content.toString()
    }
}