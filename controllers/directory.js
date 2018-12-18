const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/:id', api.isUser, api.readDirectory);
router.post('/', api.isUser, api.createDirectory);
router.put('/:id', api.isUser, api.updateDirectory);
router.delete('/:id', api.isUser, api.deleteDirectory);
router.get('/partner/:id', api.isUser, api.readPartnerOfDirectory);
router.post('/partner/', api.isUser, api.createPartnerOfDirectory);
router.put('/partner/:id', api.isUser, api.updatePartnerOfDirectory);
router.delete('/partner/:id', api.isUser, api.deletePartnerOfDirectory);

module.exports = router;
