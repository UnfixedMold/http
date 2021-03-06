# HTTP 1.1 protocol client
HTTP client implementation using java-script & [Node.js](https://nodejs.org/en/) 

Includes API for testing purposes bootstrapped with [expressjs](https://expressjs.com/)

## Installation

1. Install [Node.js](https://nodejs.org/en/) (Include node package manager)

2. Install [Typescript](https://www.typescriptlang.org/) (Optional: Development only)
```bash
npm install -g typescript
```

### Building Client or Test API
From ```/client``` or ```/test-api``` directory

1. Install all dependencies (First start only)
```
npm install
```
2. Compile to java-script

```
tsc
```

This will watch for any typescript file modifications in ```/ts``` directory and compile it to java-script files in ```/js``` directory

## Usage

### Running Test API

From ```/test-api/js``` directory run
``` 
node api
```

### Running HTTP client
From ```/client/js``` directory run 
```
node client http://www.example.com
```

**Command line arguments:**

Argument                 | Usage | Description | Options | Default
-----------------------  | ------------- | ------------- | -------------  | ------------- 
**[url]**                | *Required* | HTTP host address. Always the first argument, no prefix needed | - | -
**--type [type]**        | *Optional* | HTTP request type | GET, POST, PUT, DELETE | GET
**--headers [headers]**  | *Optional* | HTTP request headers | - | -
**--payload [payload]**  | *Optional* | HTTP request message body | - | -

**Example:**

```
node client http://localhost:3000/books/2 --type PUT --headers 'Content-Type: application/json' --payload ' { \"name\" : \"new name\" } '
```

*Note: Depending on your command line interface you may need to escape quote notations, like in the previous example with windows cmd*
