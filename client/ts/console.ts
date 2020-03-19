export enum RequestType {
    get = 'GET',
    delete = 'DELETE'
}

export interface CLA {
    url: string,
    request: RequestType
}

const requestTypes: string[] = [RequestType.get, RequestType.delete]

const verifyCommandLineArgument = (name, value): boolean => {

    switch(name) {
        case '--request':
            return requestTypes.includes(value)
        default :
            return false
    }
}

export const parseCommandLineArguments = (): CLA => {

    if(process.argv.length < 3 || process.argv[2].startsWith('--')) {
        throw Error("Invalid command line arguments")
    }

    let cla: CLA = { url: process.argv[2], request: RequestType.get }

    const leftoverLen = process.argv.length - 3;

    for(let i = 0; i<Math.floor(leftoverLen/2); i+=2) {
        
        const name = process.argv[3 + i], value = process.argv[3 + i + 1]

        if(verifyCommandLineArgument(name, value)) {
            cla[name.slice(2)] = value
        }
    }

    return cla
}