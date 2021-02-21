const express = require('express');
const router = express.Router();
const authService = require('../../services/auth/auth.service');

router.post('/', (req, res) => {
  let authResult = authService.authenticate(req.body.username, req.body.password);
  res.json({token: authResult});
});

module.exports = router;