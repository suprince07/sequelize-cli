const router=require('express').Router();
const {checkAuthenticate}=require('../middleware/auth.middleware')

router.use('/',require('./web.routes'))
router.use('/api',checkAuthenticate,require('./api.routes'))
router.use('/auth',require('./auth.routes'))

module.exports=router;