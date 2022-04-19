require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

/** CORS */
const io = require("socket.io")(server, { cors: { origin: "*" } });
var cors = require("cors");
app.use(cors());

let responses = {};  // dictionary to hold responses eg. {"Movie Title 1": 5, "Movie Title 2": 3, ...}

/** Updated the responses */
function updateResponses(responses, newResponse) {
    // add the `newResponse` to the resposes dictionary 
    //  (similar to how we update Python dictionarys)
    if (newResponse in responses) {
        responses[newResponse] += 1;
    } else {
        responses[newResponse] = 1;
    }
}

/** When the `connection` event is triggered */
io.on("connection", (socket) => {
    // send responses to the current client
    socket.emit("receive-response", responses);

    // when a `send-response` event it triggered
    socket.on("send-response", (newResponse) => {
        // update `responses`
        updateResponses(responses, newResponse);
        // broadcasts updated `responses` dictionary to all clients
        io.emit("receive-response", responses);
    });
});

const PORT = 8000;
server.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});
