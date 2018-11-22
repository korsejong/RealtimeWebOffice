const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/:id', api.readUser);
router.post('/', api.createUser);
router.put('/:id', api.updateUser);
router.delete('/:id', api.deleteUser);

module.exports = router;
