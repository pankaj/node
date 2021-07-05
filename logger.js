const EventEmitter = require('events');

class Logger extends EventEmitter {
    loger(arg) {
        this.emit("logMessage", arg);
    }

}

function logAuth(req, res, next) {
    console.log("Authonticate...")
    next();
}

// module.exports = Logger;

module.exports = logAuth