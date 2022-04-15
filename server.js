require('dotenv').config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

// CORS
const io = require('socket.io')(server, {cors: {origin: "*"}});
var cors = require('cors');
app.use(cors()); // add this line

let responses = {};

//this function is to count the percentage for the given response
function updateResponses(responses, newResponse){
  //update the percentage for this response
  // TODO XY: we need to update the percentage of all responses when a new response is added
  if (newResponse in responses){
    responses[newResponse] += 1;
    return;
  }

  responses[newResponse] = 1;
  return;
}

//whenever a client interact with the socket, the on function below will get called.
io.on("connection", (socket) => {
    //send the data back to the client
    socket.emit('connected', responses);

    //socket will display a student's messages to all students. 
    socket.on('send-response', newResponse =>{
        //update percentages
        updateResponses(responses, newResponse, totalResponses);
        //send the data back to the client
        io.emit('receive-response', responses);
    })
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
