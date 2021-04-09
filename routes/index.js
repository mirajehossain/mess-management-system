const express = require('express');

const router = express.Router();
router.route('/').get((req, res) => {
    res.json({ title: 'Welcome to the API' });
});


module.exports = router;
