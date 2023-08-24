const express=require("express");
const path=require('path')
const router =express.Router();

const app = express();

const {verifyToken,checkData,checkWorking,updateForm,fetch,fetchdata,postForm,postData,updateData,updateMail,deletedata,loginpage}=require("../controllers/control");
const { rootCertificates } = require("tls");

router.route("").get(checkWorking);

router.route('/fetch').get(fetch)
router.route('/fetchdata/:userId').get(fetchdata)
router.route('/login').get(loginpage)
router.route('/protect').get(verifyToken)


router.route('/postdata').get(postForm)
router.route('/post').post(postData)
router.route('/checkdata').post(checkData)

router.route('/updateformdata').get(updateForm)
router.route('/update/:userId').put(updateData)
router.route('/updatemail').put(updateMail)

router.route('/delete/:userId').delete(deletedata)

module.exports=router;