const express = require('express');
const router = express.Router();

// ------------------------
//          User
// ------------------------

router.get('/test', (req, res) => {
  res.send('안녕하세요');
});

module.exports = router;
