import { Header, CLA, getStringifiedHeaders, mergeJsonHeaders } from './helpers'

const version = "HTTP/1.1"

export const getRequest = ({ type, url, headers, payload }: CLA): string => {

    const getTemporaryHeaders = (): Header[] => {

        let headers = []

        if(payload) {
            headers.push(
                {
                    name: "Content-Length",
                    value: `${payload.length}`
                }
            )
        }

        return headers
    }

    // Add status line

    let request = `${type} ${url.pathname} ${version}\r\n`

    // Add headers

    const allHeaders = mergeJsonHeaders(getTemporaryHeaders(), headers)
    request += getStringifiedHeaders(allHeaders)

    // Add an empty line

    request +='\r\n'

    // Add payload

    if(payload) {
        request += payload
    }

    return request
}