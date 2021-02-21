var _users = [
    {
        username: "bruno",
        password: "UGREENBlack&Decker"
    },
    {
        username: "mario",
        password: "123"
    },
    {
        username: "merwin",
        password: "654321"
    },
    {
        username: "vanessa",
        password: "456789"
    },
];

function get(){
    return _users;
}

function getByUsername(username){
    return _users.find(x => x.username === username);
}

function getByToken(token){
    return _users.find(x => x.token === token);
}

module.exports = {
    get: get,
    getByUsername: getByUsername,
    getByToken: getByToken
}