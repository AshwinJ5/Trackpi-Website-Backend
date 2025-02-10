const express=require('express')
const adminControler = require('../controllers/adminController')
const verifyJwt = require('../middlewares/jwtMiddleware')
const router=express.Router()

router.get('/admin',verifyJwt,adminControler.getAdmins)

router.delete('/admin/:id',verifyJwt,adminControler.deleteAdmin)

router.post('/admin',verifyJwt,adminControler.addAdmin)

router.patch('/admin/:id',verifyJwt,adminControler.editAdmin)


router.post('/adminlogin',adminControler.adminLogin)

router.patch('/updateStatus/:id',verifyJwt,adminControler.adminStatusUpdate)


module.exports=router