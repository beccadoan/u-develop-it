const router = require('express').Router();
const candidateRoutes = require('../apiRoutes/candidateRoutes');
const partyRoutes = require('../apiRoutes/partyRoutes');

router.use(candidateRoutes);
router.use(partyRoutes);

module.exports = router;