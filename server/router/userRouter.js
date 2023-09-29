const router =require('express').Router()
const controllerUser=require('../controllers/user')
const session=require('../controllers/session')


router.post('/api/Create_user/electrozayn',controllerUser.CreateUser)
router.post('/api/electrozayn/login',controllerUser.LoginUser)
router.get('/api/user/getone/:id',controllerUser.getoneuser)
router.get('/api/user/getAll', controllerUser.getAllUsers);
router.get('/api/logout',controllerUser.logout)
router.post('/api/request-password-reset',session.requestPasswordReset)
router.put('/api/password/reset/:token',session.resetPassword)
router.put('/api/update_user/:id',controllerUser.updateUser)

// newsletter
router.post("/api/user/newsletter",controllerUser.newsletterUser)
module.exports={userRoter:router}