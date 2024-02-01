const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:4200',
  }
}).listen(server, {origin: "http://localhost:4200"});


users = []
definitions = []

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
  

  console.log('listening on *:3000');

  io.on('connection', (socket) => {
    
      console.log('a user connected');
      
      socket.on('joinRoom', data=>{
        const userInRoom = users.find(user=> user.username === data.name && user.room === data.room)
        if(userInRoom){
          userInRoom.socketId = socket.id
        }else{
          users.push({
            socketId: socket.id,
            username: data.name,
            room: data.room
          })
        }
        socket.join(data.room) 
        console.log("sala criada")

      })
      
      socket.on("room", (room)=>{
        io.to(`${room}`).emit("number", "1")
      })

      socket.on("getUsers", (room)=>{
        let passUsers = []
        users.find(user =>{
          if(user.room === room)
            passUsers.push(user.username)

        }) 
        io.to(`${room}`).emit('setUsers', passUsers)
      })

      socket.on("start", (room)=>{
        io.to(`${room}`).emit('start') 
      })

      socket.on("selectWord", (data)=>{
        console.log(data)
        io.to(`${data.room}`).emit("selectWord",data.word)
      })

      socket.on("allDefinitions", (data)=>{
        definitions.push(data)
        let definitionsRoom = []
        definitions.forEach(definition => {
            if(definition.room === data.room){
              definitionsRoom.push(definition.definition)
            }
        });
        console.log(definitionsRoom, definitions)
        io.to(`${data.room}`).emit("allDefinitions", definitionsRoom)
      })

      socket.on("deleteAllDefinition", (room)=>{
        let newDefinitions = []
        definitions.forEach(definition =>{
          if(definition.room != room){
            newDefinitions.push(definition)
          }
        })
        definitions = newDefinitions
      })

      socket.on("definitionsSelected", data=>{
        io.to(`${data.room}`).emit("definitionsSelected", data.definitions)
      })

      socket.on("points",(data)=>{
        io.to(`${data.room}`).emit("points", data)
      })

      socket.on("nextStage", (data)=>{
        io.to(`${data.room}`).emit("nextStage", data.stage)
      })

      socket.on("vote", (data)=>{
        io.to(`${data.room}`).emit("vote", data.vote)
    })

    
      socket.on("finalPoints", (room)=>{
        io.to(`${room}`).emit("finalPoints")
      })

  
      socket.on('disconnect', () => {
        let newArray = users
        newArray.forEach((user, i) =>{
          if(user.socketId === socket.id){
            users.splice(i,1)
          }
        })
        console.log('user disconnected');
      });
  });

});
