const Gpio = require('pigpio').Gpio

let dutyCycleTimer

const addSocketListeners = (socket, io) => {
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })

  socket.on('LED-STATUS-CHANGE', res => {
    io.emit('LED-STATUS-UPDATE', res)
  })
  
  socket.on('LED-STATUS-CHECK', res => {
    console.log('ok')
    const red = new Gpio(17, {mode: Gpio.OUTPUT})
    const green = new Gpio(18, {mode: Gpio.OUTPUT})
    io.emit('LED-STATUS-UPDATE', !!dutyCycleTimer)
  })

   socket.on('LED-STATUS-CHANGE', res => {
    const red = new Gpio(17, {mode: Gpio.OUTPUT})
    const green = new Gpio(18, {mode: Gpio.OUTPUT})
    let dutyCycle = 0
    let redOn = true
    
    const cycleLEDs = () => {
      dutyCycle += 5
      if (dutyCycle > 255) {
        dutyCycle = 0
        if(redOn){
          red.pwmWrite(dutyCycle)
          redOn = false
        }else {
          green.pwmWrite(dutyCycle)
          redOn = true
        }
      }
      if(redOn){
        red.pwmWrite(dutyCycle)
      }else {
        green.pwmWrite(dutyCycle)
      }  
    }
    
    
     if(res === true){
       dutyCycleTimer = setInterval(cycleLEDs, 20)
     }else {
       clearInterval(dutyCycleTimer)
       dutyCycleTimer = null
       green.pwmWrite(0)
       red.pwmWrite(0)
    }
  })
}

module.exports = { addSocketListeners }
