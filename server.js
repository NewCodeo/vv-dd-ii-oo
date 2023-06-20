const express =  require('express')
const path = require('path')
const app = express()
const {v4:uuid} = require('uuid')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
app.set('view engine','ejs')
app.get('/',(req,res)=>{
  res.redirect(`/${uuid()}`)
})
app.get('/:rm',(req,res)=>{
    res.render('index',{roomId:req.params.rm})
})
io.on('connection',(socket)=>{
    socket.on('join_room',(userId,roomId)=>{
        socket.join(roomId)
        socket.broadcast.emit('user_connected',userId)
        
        
    })
 
 
})

server.listen(3000)