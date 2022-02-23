const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json([{a:34}]);
});

module.exports = router;