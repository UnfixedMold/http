interface StatusLine {
    protocol: String,
    status: Number
}

interface Header {
    name: String,
    value: String
}

interface Info {
    protocol: String,
    status: Number,
    headers: Header[]
}

interface HttpResponse {
    protocol: String,
    status: Number,
    headers: Header[],
    content: String
}

const splitBufferBy = (buffer: Buffer, delimeter: string): Buffer[] => {

    const index = buffer.indexOf(delimeter)

    let first = Buffer.alloc(index)
    buffer.copy(first, 0, 0, index)

    let second = Buffer.alloc(Buffer.byteLength(buffer) - (index + delimeter.length))

    buffer.copy(second, 0, index + delimeter.length)

    return [first, second]
}

const parseStatusLine = (buffer: Buffer): StatusLine => {

    const [protocol, statusMessage] = splitBufferBy(buffer, ' ')

    const [ status ] = splitBufferBy(statusMessage, ' ')

    return { protocol: protocol.toString(), status: Number(status.toString()) }
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

const parseResponse = (buffer: Buffer): HttpResponse => {
    const [info, content] = splitBufferBy(buffer, '\r\n\r\n')

    return {
        ...parseInfo(info),
        content: content.toString()
    }
}

module.exports = { parseResponse }