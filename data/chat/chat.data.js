let _chatroom = [];

function add(m) {
    if (!m.username || !m.text) return;
    let message = {
        username: m.username,
        text: m.text,
        date: new Date().toISOString()
    }
    _chatroom.push(message);
}

function get() {
    return _chatroom;
}

module.exports = {
    add: add,
    get: get
}