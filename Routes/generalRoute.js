const express = require("express");
const router = express.Router();
const { index, entertainment, news, politics, sports, technology } = require("../Controller/generalController");

// Define routes
router.get('/', index);
router.get("/entertainment", entertainment);
router.get("/news", news);
router.get("/politics", politics);
router.get("/sports", sports);
router.get("/technology", technology);

// Export the router
module.exports = router; 
