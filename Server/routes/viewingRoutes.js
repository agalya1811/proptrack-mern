const express = require('express');
const router = express.Router();
const viewingController = require('../controllers/viewingController');

router.post('/', viewingController.createViewing);
router.patch('/:id', viewingController.updateViewingStatus);

module.exports = router;
