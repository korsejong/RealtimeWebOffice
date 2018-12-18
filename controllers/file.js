const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/:id', api.isUser, api.readFile);
router.post('/', api.isUser, api.createFile);
router.put('/:id', api.isUser, api.updateFile);
router.delete('/:id', api.isUser, api.deleteFile);
router.get('/partner/:id', api.isUser, api.readPartnerOfFile);
router.post('/partner/', api.isUser, api.createPartnerOfFile);
router.put('/partner/:id', api.isUser, api.updatePartnerOfFile);
router.delete('/partner/:id', api.isUser, api.deletePartnerOfFile);

module.exports = router;
