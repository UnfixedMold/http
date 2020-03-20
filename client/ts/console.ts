import { RequestType, CLA, getJsonHeaders, mergeJsonHeaders } from './helpers'

export enum ArgumentType {
    type = '--type',
    headers = '--headers',
    payload = '--payload'
}

const verifyCommandLineArgument = (name: string): boolean => {
    return Object.values(ArgumentType).includes(name as ArgumentType)
}

export const parseCommandLineArguments = (): CLA => {

    if(process.argv.length < 3 || process.argv[2].startsWith('--')) {
        throw Error("Invalid command line arguments")
    }

    const url: URL = new URL(process.argv[2])
    
    let cla: CLA = { url, type: RequestType.get, headers: [{ name: 'Host', value: url.hostname }] }

    const getCommandLineArgument = (name: string, value: string) => {
    
        switch(name) {
            case ArgumentType.type:

                if(Object.values(RequestType).includes(value as RequestType)) {
                    return value as RequestType
                }
            
                return cla.type

            case ArgumentType.headers:

                const initialHeaders = cla.headers
                const userHeaders = getJsonHeaders(value)
                return mergeJsonHeaders(initialHeaders, userHeaders)

            default:
                return value
        }
    }

    let argIndex = 3

    while((argIndex + 2) <= process.argv.length) {

        const name = process.argv[argIndex], value = process.argv[argIndex + 1]

        if(verifyCommandLineArgument(name)) {
            cla[name.slice(2)] = getCommandLineArgument(name, value)
        }

        argIndex+=2
    }

    return cla
}