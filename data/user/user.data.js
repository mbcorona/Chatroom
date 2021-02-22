var _users = [
    {
        username: "bruno",
        password: "09876"
    },
    {
        username: "alexa",
        password: "76543"
    },
    {
        username: "merwin",
        password: "34567"
    },
    {
        username: "vanessa",
        password: "12345"
    },
];

function getByUsername(username){
    return _users.find(x => x.username === username);
}

function getByToken(token){
    return _users.find(x => x.token === token);
}

module.exports = {
    getByUsername: getByUsername,
    getByToken: getByToken
}