const Logger = require('./logger');
const loger = new Logger();

loger.on('logMessage', (arg) => {
    console.log("Logging Meaasge:", arg);
})


loger.loger({ _id: '5dssdklmfs4dfmk', name: "Pankaj" })
