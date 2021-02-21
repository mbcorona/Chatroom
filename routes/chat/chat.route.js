module.exports = function (io) {
  const express = require('express');
  const router = express.Router();
  const authService = require('../../services/auth/auth.service');
  const chatService = require('../../services/chat/chat.service')(io);

  router.use(function (req, res, next) {
    let token = req.headers['token'];
    let user = authService.authenticateWithToken(token);
    if (!user) return res.status(401).send();
    req.user = user;
    next();
  })

  router.post('/', (req, res) => {
    chatService.sendMessage(req.user, req.body.text);
    res.send();
  });

  router.get('/', (req, res) => {
    res.json(chatService.getChat());
  });

  return router;
}