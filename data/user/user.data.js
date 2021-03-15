const User = require('./user.model');

async function addUser(user){
    let _user = new User(user);
    return await _user.save();
}

async function getByUsername(username){
    return await User.findOne({username: username});
}

function getByToken(token){
    return _users.find(x => x.token === token);
}

module.exports = {
    addUser: addUser,
    getByUsername: getByUsername,
    getByToken: getByToken
}