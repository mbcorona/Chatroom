const userData = require('../../data/user/user.data');
const jwt = require('jsonwebtoken');
const secret = "chatroom_secret";

function _generateToken(payload) {
    return jwt.sign(payload, secret);
}

function _verifyToken(token) {
    let decoded;
    try {
        decoded = jwt.verify(token, secret);
    } catch (error) {
    }
    return decoded;
}

async function signup(user) {
    let response = await userData.addUser(user);
    return response;
}

async function authenticate(username, password) {
    let user = await userData.getByUsername(username);
    if (user && user.password === password) {
        var token = _generateToken({ username: username });
        user.token = token;
        return token;
    }

    return null;
}

async function authenticateWithToken(token) {
    let payload = _verifyToken(token);
    if (!payload) return null;

    return await userData.getByUsername(payload.username);
}

module.exports = {
    signup: signup,
    authenticate: authenticate,
    authenticateWithToken: authenticateWithToken
};