let express = require('express');
let router = express.Router();
//***define index controller */
let indexController = require('../controllers/index')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//*** Post - processing the login, registration page and performing logout */

/* Post - processes the Login Page */
router.post('/login', indexController.processLoginPage);

/* POST - processes the User Registration Page */
router.post('/register', indexController.processRegisterPage);

/* GET - perform user logout */
router.get('/logout', indexController.performLogout);

module.exports = router;
