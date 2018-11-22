const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/:id', api.readFile);
router.post('/', api.createFile);
router.put('/:id', api.updateFile);
router.delete('/:id', api.deleteFile);
router.get('/partner/:id', api.readPartnerOfFile);
router.post('/partner/', api.createPartnerOfFile);
router.put('/partner/:id', api.updatePartnerOfFile);
router.delete('/partner/:id', api.deletePartnerOfFile);

module.exports = router;
