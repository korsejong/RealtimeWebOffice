const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/:id', api.readUser);
router.post('/:id', api.createUser);
router.put('/', api.updateUser);
router.delete('/:id', api.deleteUser);

module.exports = router;
