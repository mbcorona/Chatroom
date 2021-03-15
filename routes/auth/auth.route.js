const express = require('express');
const router = express.Router();
const authService = require('../../services/auth/auth.service');

router.post('/', async (req, res) => {
  let authResult = await authService.authenticate(req.body.username, req.body.password);
  res.json({ token: authResult });
});

router.post('/signup', async (req, res) => {
  try {
    let authResult = await authService.signup(req.body);
    res.json({ token: authResult });
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = router;