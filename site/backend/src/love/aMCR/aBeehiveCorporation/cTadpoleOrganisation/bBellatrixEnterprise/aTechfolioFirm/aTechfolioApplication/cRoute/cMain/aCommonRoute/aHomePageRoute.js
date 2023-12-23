const express = require('express');
const { homePageController } = require('../../../bController/cMain/aCommonController/aHomePageController');

const router = express.Router();


router.route("/retrieve").get(homePageController().retrieve);

module.exports = router
