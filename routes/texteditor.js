const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/:id', api.isUser, api.renderTexteditor);

module.exports = router;
