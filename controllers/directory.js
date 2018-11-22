const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/:id', api.readDirectory);
router.post('/', api.createDirectory);
router.put('/:id', api.updateDirectory);
router.delete('/:id', api.deleteDirectory);
router.get('/partner/:id', api.readPartnerOfDirectory);
router.post('/partner/', api.createPartnerOfDirectory);
router.put('/partner/:id', api.updatePartnerOfDirectory);
router.delete('/partner/:id', api.deletePartnerOfDirectory);

module.exports = router;
