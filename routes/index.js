const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/', api.renderIndex);

module.exports = router;
