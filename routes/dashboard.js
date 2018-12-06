const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/', api.isUser, api.renderDashboard);
router.get('/private', api.isUser, api.renderPrivateDashboard);
router.get('/public', api.isUser, api.renderPublicDashboard);
router.get('/private/:path', api.isUser, api.renderPrivateDashboardOfPath);
router.get('/public/:path', api.isUser, api.renderPublicDashboardOfPath);

module.exports = router;
