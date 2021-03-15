module.exports = function (io) {
  const express = require('express');
  const router = express.Router();
  const authService = require('../../services/auth/auth.service');
  const chatService = require('../../services/chat/chat.service')(io);

  router.use(async (req, res, next) => {
    let token = req.headers['token'];
    let user = await authService.authenticateWithToken(token);
    if (!user) return res.status(401).send();
    req.user = user;
    next();
  })

  router.post('/', (req, res) => {
    chatService.sendMessage(req.user, req.body.text);
    res.send();
  });

  router.get('/', async (req, res) => {
    res.json(await chatService.getChat());
  });

  return router;
}