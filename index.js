var Readable = require("readable-stream").Readable;
var util = require("util");

var HTTPiped = function(instance) {
    Readable.call(this, {
        objectMode: true,
        highWaterMark: 0
    });
    this.instance = instance;

    this.instance.on("request", function(req, res) {
        this.push({req: req, res: res});
    }.bind(this));
}

util.inherits(HTTPiped, Readable);

HTTPiped.prototype._read = function() {}

module.exports = HTTPiped;
