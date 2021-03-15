
class Connection {
    constructor() {
        const connectionString = "<your connection string goes here>";
        const mongoose = require('mongoose');
        mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("Database connected");
        });
    }
}

module.exports = new Connection();