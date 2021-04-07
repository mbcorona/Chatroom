# Chatroom
This application should allow several users to talk in a chatroom and also to get stock quotes
from an API using a specific command.

## Running Chatroom locally
Clone repo then..

This project uses a Mongo DB, replace your connection string in the following file
```
data/database.js
```

```
$ npm install
$ node index.js
```

## Running tests
This project uses Jasmine for unit testing.

```
$ npm test
```

## TODO:
* Create UI for Signup
* Add ability to have multiple rooms