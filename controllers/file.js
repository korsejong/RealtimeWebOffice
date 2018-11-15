const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/:id', api.readFile);
router.post('/:id', api.updateFile);
router.put('/', api.createFile);
router.delete('/:id', api.deleteFile);
router.get('/partner/:id', api.readPartnerOfFile);
router.post('/partner/:id', api.updatePartnerOfFile);
router.put('/partner/:id', api.createPartnerOfFile);
router.delete('/partner/:id', api.deletePartnerOfFile);

module.exports = router;
