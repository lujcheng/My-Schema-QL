const app = require('http').createServer();
const io = module.exports.io = require('socket.io')(app);
const PORT = process.env.PORT || 8080;
const SocketManager = require('./SocketManager.js');

io.on('connection', SocketManager);

app.listen(PORT, ()=>{
  console.log("connected to Port: " + PORT)
})

io.on('input-update', (state) => {
  console.log('state ', state)
})