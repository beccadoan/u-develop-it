const router = require('express').Router();
const candidateRoutes = require('../apiRoutes/candidateRoutes');
const partyRoutes = require('../apiRoutes/partyRoutes');
const voterRoutes = require('../apiRoutes/voterRoutes');

router.use(candidateRoutes);
router.use(partyRoutes);
router.use(voterRoutes);

module.exports = router;