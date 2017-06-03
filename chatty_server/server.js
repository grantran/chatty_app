// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidV1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// sends data to all clients 
function broadcast(data) {
  for(let client of wss.clients) {
    client.send(data);
  }
}

// generates a random colour 
function ran_col() {
  var color = '#'; 
  var letters = ['FFAA00','FF00AA','AA00FF','00AAFF','6D997A','DED1B6']; 
  color += letters[Math.floor(Math.random() * letters.length)];

  return color;
}

function handleMessage(data) {
  let parsedData = JSON.parse(data);

  switch (parsedData.type) {
    case 'postMessage': 
      parsedData.id = uuidV1();
      parsedData.username = parsedData.username || "Anon";
      parsedData.type = "incomingMessage"
      broadcast(JSON.stringify(parsedData));
      break;
    case 'postNotification':
      parsedData.id = uuidV1();
      parsedData.type = 'incomingNotification'
      broadcast(JSON.stringify(parsedData));
      break;
    default:
      throw new Error('Unknown error type: ' + data.type);
  }

  }


function handleConnection(client) {
  console.log('Client connected');
  broadcast(wss.clients.size);

  // everytime a new client connects, the server assigns a random colour to that user
  client.send(JSON.stringify({type: 'initial_connection', userColor: ran_col()}));
  
  client.on('message', handleMessage)
  client.on('close', () => console.log('Client disconnected'));
}

wss.on('connection', handleConnection);
