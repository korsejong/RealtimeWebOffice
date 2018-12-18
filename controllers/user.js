const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/:id', api.isUser, api.readUser);
router.post('/', api.createUser);
router.put('/:id', api.isUser, api.updateUser);
router.delete('/:id', api.isUser, api.deleteUser);

router.get('/email/:email', api.isUser, api.readUserByEmail);

module.exports = router;
