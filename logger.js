const EventEmitter = require('events');

class Logger extends EventEmitter {
    loger(arg) {
        this.emit("logMessage", arg);
    }

}

module.exports = Logger;