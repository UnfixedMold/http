// Interfaces

export interface StatusLine {
    protocol: String,
    statusCode: Number,
    statusMessage: String
}

export interface Header {
    name: String,
    value: String
}

export interface Info {
    protocol: String,
    statusCode: Number,
    statusMessage: String,
    headers: Header[]
}

export interface HttpResponse {
    protocol: String,
    statusCode: Number,
    statusMessage: String,
    headers: Header[],
    content: String
}

export interface CLA {
    url: URL,
    type: RequestType,
    headers: Header[],
    payload?: string
}

// Functions

export const getJsonHeaders = (value: string): Header[] => {

    const headers = value
        .split(',')
        .map(header => {

            let [name, value] = header.split(':')

            if(!(name && value)) {
                return null
            }

            name = name.trim()
            value = value.trim()

            if(!(name.length && value.length)) {
                return null
            }

            return { name, value }
        })

    return headers
}

export const getStringifiedHeaders = (headers: Header[]): string => {

    const getStrigifiedHeader = ({ name, value}): string => {
        return `${name}: ${value}\r\n`
    }
    
    return headers.reduce((req, h) => {
        return req+=getStrigifiedHeader(h)
    }, '')
}

export const mergeJsonHeaders = (first: Header[], second: Header[]): Header[] => {
    
    let mergedHeaders: Header[] = [...first]

    second.forEach(header => {
    
        if(header) {

            const index = mergedHeaders.findIndex(h => h.name === header.name)

            if(index >= 0) {
                mergedHeaders[index].value = header.value
            } else {
                mergedHeaders.push(header)
            }
        }
    })

    return mergedHeaders
}

export const splitBufferBy = (buffer: Buffer, delimeter: string): Buffer[] => {

    const index = buffer.indexOf(delimeter)

    let first = Buffer.alloc(index)
    buffer.copy(first, 0, 0, index)

    let second = Buffer.alloc(Buffer.byteLength(buffer) - (index + delimeter.length))

    buffer.copy(second, 0, index + delimeter.length)

    return [first, second]
}

// Enums 

export enum RequestType {
    get = 'GET',
    post = 'POST',
    put = 'PUT',
    delete = 'DELETE'
}