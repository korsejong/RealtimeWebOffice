const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/:path', api.renderTexteditor);

module.exports = router;
