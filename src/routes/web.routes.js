const router = require('express').Router();
const ViewController = require('../controllers/views.controller');

router.get('/', ViewController.homepage)
router.get('/about', ViewController.aboutPage)
router.get('/contact', ViewController.contactPage)
router.get('/login', ViewController.loginPage)

module.exports = router;