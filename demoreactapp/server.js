const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

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
  console.log(req.body)
  const message = req.body.message;
  enqueueMessage(message);
  res.status(201).json({ message: 'Message enqueued successfully' });
});

// Route to retrieve messages from the queue
app.get('/dequeue/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const message = dequeueMessage();
  if (message) {
    res.json({ message });
  } else {
    res.status(404).json({ message: 'No messages in the queue' });
  }
});
