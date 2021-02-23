const express = require('express');
const router = express.Router();

// *** candidateRoutes router *** //
router.use(require('./candidateRoutes'));

// *** partyRoutes router *** //
router.use(require('./partyRoutes'));

// *** partyRoutes router *** //
router.use(require('./voterRoutes'));

// *** voteRoutes router *** //
router.use(require('./voteRoutes'));


module.exports = router;