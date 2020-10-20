const Gpio = require('onoff').Gpio

//GPIO 7
const GPIOpin7 = new Gpio(7, 'out')
//GPIO 3
const GPIOpin3 = new Gpio(3, 'out')
//GPIO 22
const GPIOpin22 = new Gpio(22, 'out')
//GPIO 25
const GPIOpin25 = new Gpio(25, 'out')

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

io.sockets.on('connection', (socket7) => {
    let buttonState = 0
        socket7.on('pwm7', (data) => {
            buttonState = data
             if(buttonState != GPIOpin7.readSync()) {
                 GPIOpin7.writeSync(buttonState)
             }
        })
})

io.sockets.on('connection', (socket3) => {
    let buttonState = 0
        socket3.on('pwm3', (data) => {
            buttonState = data
            if (buttonState != GPIOpin3.readSync()) {
                GPIOpin3.writeSync(buttonState)
            }
        })
})

