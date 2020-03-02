const express = require('express');
const router = express.Router();

const controller = require('../Controllers/userController');

/**
 * Routing  get/post requests 
 */
router.post('/login', controller.login);
router.post('/register',controller.register);
router.get('/naCekanju', controller.getNaCekanju);
router.post('/approve', controller.approveReg);
router.post('/disapprove', controller.disapproveReg);
router.get('/registredUsers', controller.registredUsers);
router.post('/deleteUser', controller.deleteUser);
router.post('/changePass', controller.changePass);
module.exports = router;
