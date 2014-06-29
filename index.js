var Readable = require("readable-stream").Readable;
var util = require("util");
var http = require("http");

var HTTPiped = function(server) {
    if (!(server instanceof http.Server))
        throw new Error("http.Server required");

    Readable.call(this, {
        objectMode: true,
        highWaterMark: 0
    });

    server.on("request", function(req, res) {
        this.push({req: req, res: res});
    }.bind(this));

    server.on("close", function() {
        this.push(null);
    }.bind(this));
}

util.inherits(HTTPiped, Readable);

HTTPiped.prototype._read = function() {}

module.exports = HTTPiped;
