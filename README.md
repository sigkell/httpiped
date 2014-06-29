# HTTPiped
> turn `http.Server` instances into readable streams

HTTPiped allows you to wrap an instance of `http.Server` into a Readable Stream in objectMode, opening up the opportunity to create stream-based middleware.

## Installation

    npm install httpiped

## Example

### `server.js`

```js
var HTTPiped = require("httpiped");
var http = require("http");

// middleware
var logger = require("./logger");
var handler = require("./handler");

var server = http.createServer();
var stream = new HTTPiped(server);

stream.pipe(logger())
      .pipe(handler());
```

### `logger.js`

```js
var stream = require("stream");

var createLogger = function() {
    var logger = new stream.Transform({objectMode: true});

    logger._transform = function(client, encoding, done) {
        console.log("Request from " + client.req.remoteAddress);
        done();
    }

    return logger;
}

module.exports = createLogger;
```

### `handler.js`

```js
var stream = require("stream");

var createHandler = function() {
    var handler = new stream.Transform({objectMode: true});

    handler._transform = function(client, encoding, done) {
        var path = client.req.path;
        var split = path.split("/");
        client.res.end(split + "\n");
    }

    return handler;
}

module.exports = createHandler;
```
