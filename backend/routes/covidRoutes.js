// covidRoutes.js content placeholder
const express = require('express');
const router = express.Router();
const covidCtrl = require('../controllers/covidController');

router.post('/add', covidCtrl.addData);
router.post('/update', covidCtrl.updateData);
router.get('/total/:state', covidCtrl.getTotal);
router.post('/delete', covidCtrl.deleteData);
router.get('/filtered', covidCtrl.getFiltered);
router.get('/high', covidCtrl.getHighStates);

module.exports = router;
