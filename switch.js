const Gpio = require('onoff').Gpio

//GPIO 4
const GPIOpin4 = new Gpio(4, 'out')
//GPIO 22
const GPIOpin22 = new Gpio(22, 'out')
//GPIO 6
const GPIOpin6 = new Gpio(6, 'out')
//GPIO 26
const GPIOpin26 = new Gpio(26, 'out')

const fs = require('fs')

const http = require('http').createServer(
    handler = (req, res) => {
        fs.readFile(__dirname + '/index.html',
            (err, data) => {
                console.log(__dirname)
                console.log(data)
                if (err) {
                    res.writeHead(500)
                     return res.end("socket won't load unless there's an index.html dude")
                }
                res.writeHead(200)
                res.end(data)
    })
})

const io = require('socket.io')(http)

const PORT = process.env.PORT || 7772
    http.listen(PORT, () => {
        console.log(`Listening to Chou by Amano Tsukiko on PORT ${PORT}`)
})

io.sockets.on('connection', (socket4) => {
    let buttonState = "0"
        socket4.on('pwm4', (data) => {
            buttonState = data
             if(buttonState != GPIOpin4.readSync()) {
                 GPIOpin4.writeSync(buttonState)
             }
        })
})

io.sockets.on('connection', (socket22) => {
    let buttonState = 0
        socket22.on('pwm22', (data) => {
            buttonState = data
            if (buttonState != GPIOpin22.readSync()) {
                GPIOpin22.writeSync(buttonState)
            }
        })
})

