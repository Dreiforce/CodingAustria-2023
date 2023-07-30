const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3


const http = require('http').Server(app);
//New imports



const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000"
  }
});

var adminId = undefined;



//Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected! ${socket.name}`);
  
  
  // socketIO.to(socket.id).emit("update_state", {userName:"test", other: "test"});
  
  socket.on('update_state', (data) => {
    console.log(`up state ${JSON.stringify(data)}`)
    if(adminId !== undefined) socket.to(adminId).emit("update_state", data)
    });
  socket.on('make_admin', (data) => {
    console.log(data.socketID + "user wants to be admin")
    adminId = data.socketID
  })
  socket.on('message', (data) => {
  console.log(`messag ${JSON.stringify(data)}`)
  });
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

app.use(express.json());
// This displays message that the server running and listening to specified port
// app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
http.listen(port, () => {

  console.log(`Server listening on ${port}`);

});

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

// In-memory message queue
const messageQueue = {};

// Add a message to the queue
function enqueueMessage(id, message) {
  if (messageQueue[id] == undefined) {
    messageQueue[id] = []
  }
  messageQueue[id].push(message);
}

// Get the next message from the queue
function dequeueMessage(id) {
  if (messageQueue[id] === undefined)
    return undefined;
  return messageQueue[id].shift();
}

// Route to add messages to the queue
app.post('/enqueue/:id', (req, res) => {
  const id = req.params.id;
  const message = req.body.message;
  console.log(`Enqueue message for id ${id}: ${message}`)
  enqueueMessage(id, message);
  res.status(200).json({ message: 'Message enqueued successfully' });
});

// Route to retrieve messages from the queue
app.get('/dequeue/:id', (req, res) => {
  const id = req.params.id;
  const message = dequeueMessage(id);
  if (message) {
    console.log(`Dequeue message: ${message}`)
    res.json({ empty: false, message: message });
  } else {
    res.json({ empty: true, message: "" })
  }
});
