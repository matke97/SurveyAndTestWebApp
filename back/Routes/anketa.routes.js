const express = require('express');
const router = express.Router();

const controller = require('../Controllers/anketaController');

/**
 * Routing  get/post requests 
 */
router.post('/regAnketu', controller.registerSurvey);
router.get('/getPitanja', controller.getQuestions);
router.post('/getDostupne', controller.getAvailableSurveysTests);
router.post('/getbyid', controller.getSurveyByID);
router.post('/obrisiAnketu', controller.removeSurvey);
router.post('/getMojeAnkete', controller.getMySurveys);
router.post('/insertNedovrsenu', controller.insertNedovrsenu);
router.post('/submitTest', controller.submitTest);
router.post('/submitSurvey', controller.submitSurvey);
router.post('/getNedovrsena', controller.getNedovrsena);
router.post('/getPopunjene', controller.getPopunjene);

module.exports = router;