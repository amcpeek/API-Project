// backend/routes/api/session.js
const express = require('express')
const router = express.Router();

// backend/routes/api/session.js
//const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot } = require('../../db/models');

module.exports = router;
