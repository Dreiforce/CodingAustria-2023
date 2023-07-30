const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

app.use(express.json()); 
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

// In-memory message queue
const messageQueue = [];

// Add a message to the queue
function enqueueMessage(message) {
  messageQueue.push(message);
}

// Get the next message from the queue
function dequeueMessage() {
  return messageQueue.shift();
}

// Route to add messages to the queue
app.post('/enqueue/:id', (req, res) => {
  const id = req.params.id;
  const message = req.body.message;
  console.log(`Enqueue message: ${message}`)
  enqueueMessage(message);
  res.status(200).json({ message: 'Message enqueued successfully' });
});

// Route to retrieve messages from the queue
app.get('/dequeue/:id', (req, res) => {
  const id = req.params.id;
  const message = dequeueMessage();
  if (message) {
    console.log(`Dequeue message: ${message}`)
    res.json({ message });
  }
});
