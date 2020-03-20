# HTTP 1.1 protocol client
Htttp client implementation using javascript & Node.js. 

Includes API for testing purposes bootstrapped with expressjs

## Installation

1. Install Node.js

2. Install Typescript (Optional: Development only)
```bash
npm install -g typescript
```

### Building Client or Test API
From Client or Test API directory run
```
tsc
```

This will watch for any typescript file modifications in /ts directory and compile it to javascript files in /js directory

## Usage

### Running Test API

From test-api/js directory run
``` 
node api
```

### Running Http client
From client/js directory run 
```
node client http://www.example.com
```

**Implemented command line arguments:**

* **--type**
HTTP protocol request type. Implemented: GET, POST, PUT, DELETE. Default: GET
* **--headers**
HTTP protocol request headers.
* **--payload**
HTTP protocol request message body.

**Example:**

```
node client http://localhost:3000/books/2 --type PUT --headers 'Content-Type: application/json' --payload ' { \"name\" : \"new name\" } '
```

*Note: Depending on your command line interface you may need to escape quote notations, like in the previous example using windows cmd*
