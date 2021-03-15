const express = require('express');
const app = express();
const port = 3000;
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('./data/database');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", express.static('./pages/login'));
app.use("/chatroom", express.static('./pages/chatroom'));

const auth = require('./routes/auth/auth.route');
app.use('/auth', auth);

const chat = require('./routes/chat/chat.route')(io);
app.use('/chat', chat);

http.listen(port, () => {
  console.log(`Chatroom app listening at http://localhost:${port}`)
})