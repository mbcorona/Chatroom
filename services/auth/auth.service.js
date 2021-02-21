let userData = require('../../data/user/user.data');

function generateToken() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function authenticate(username, password) {
    let user = userData.getByUsername(username);
    if (user && user.password === password) {
        var token = generateToken();
        user.token = token;
        return token;
    }

    return null;
}

function authenticateWithToken(token) {
    return userData.getByToken(token);
}

module.exports = {
    authenticate: authenticate,
    authenticateWithToken: authenticateWithToken
};