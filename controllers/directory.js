const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/:id', api.readDirectory);
router.post('/:id', api.updateDirectory);
router.put('/', api.createDirectory);
router.delete('/:id', api.deleteDirectory);
router.get('/partner/:id', api.readPartnerOfDirectory);
router.post('/partner/:id', api.updatePartnerOfDirectory);
router.put('/partner/:id', api.createPartnerOfDirectory);
router.delete('/partner/:id', api.deletePartnerOfDirectory);

module.exports = router;
