const router = require('express').Router();
const candidateRoutes = require('../apiRoutes/candidateRoutes');

router.use(candidateRoutes);

module.exports = router;