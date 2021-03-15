const Chat = require('./chat.model');

// Currently 1 chatroom is supported
const room = 'chatroom1';

function add(m) {
    let chat = new Chat({
        room: room,
        username: m.username,
        text: m.text,
        date: new Date().toISOString()
    });
    chat.save();
}

async function get(options) {

    let query = {
        room: room
    };

    let queryOptions = {
        limit: options && options.limit ? options.limit : 50,
        sort: 'date'
    };

    let chat = await Chat.find(query, null, queryOptions);
    return chat;
}

module.exports = {
    add: add,
    get: get
}