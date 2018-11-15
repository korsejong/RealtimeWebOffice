const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/', api.renderDashboard);
router.get('/private', api.renderPrivateDashboard);
router.get('/public', api.renderPublicDashboard);
router.get('/private/:path', api.renderPrivateDashboardOfPath);
router.get('/public/:path', api.renderPublicDashboardOfPath);

module.exports = router;
