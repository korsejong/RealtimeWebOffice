const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/:id', api.readUser);
router.post('/:id', api.updateUser);
router.put('/', api.createUser);
router.delete('/:id', api.deleteUser);

module.exports = router;
