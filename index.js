const https = require("https");
const http = require("http");
const fs = require("fs");
const app = require("./app");

const {API_PORT} = process.env;
const port = process.env.PORT || API_PORT;

// http
const server = http.createServer(app);

// https
// const options = {
//   key: fs.readFileSync(__dirname + '/dist/fixtures/keys/key.pem'),
//   cert: fs.readFileSync(__dirname + '/dist/fixtures/keys/cert.pem')
// };
//
// const server = https.createServer(options, app);

let users = [];
const addUser = ({userId, socketId}) => {
  if (!users.some(user => user.id === userId)) {
    users.push({
      id: userId,
      socketId
    });
  }
}

const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId);
}

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
})

const Model = require("./models");
io.on("connection", (socket) => {
  io.emit("welcome", "hello from server");
  socket.on("addUser", (userId) => {
    addUser({userId, socketId: socket.id});
  });
  socket.on("sendMessage", async (messageId) => {
    const message = await Model.Message.findByPk(messageId);
    let conversation;
    if (message) {
      conversation = await Model.Conversation.findByPk(message.ConversationId);
    }
    const members = await conversation.getUsers();
    members.forEach(member => {
      const usr = users.find(user => user.id === member.id);
      if (usr) {
        io.to(usr.socketId).emit("getMessage", message);
      }
    });

    console.log("sending a message")
    console.log(conversation);
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});