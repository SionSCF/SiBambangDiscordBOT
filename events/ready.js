const rfs = require('rotating-file-stream');
const path = require('node:path');

const stream = rfs.createStream('ready.log', {
    interval: '1d',
    path: path.join(__dirname, 'log')
})

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const date = new Date();
        stream.write(`uwu Bambang is up and ready to serve you, Master uwu \n${client.user.tag} is fired up at ${date}\n`)
    }
}