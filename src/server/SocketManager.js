const io = require('./server.js').io
module.exports = function(socket) {
  socket.on('input-update', data => {
    io.emit('state-update', data)
  })

  socket.on('create-table', data => {
    io.emit('new-table', data)
  })

  socket.on('table-change', data => {
    console.log("table data: ", data)
    io.emit('table-update', data)
  })
}