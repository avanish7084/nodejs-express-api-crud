const express=require("express");
const path=require('path')
const router =express.Router();

const app = express();

const {checkWorking,updateForm,fetch,fetchdata,postForm,postData,updateData,updateMail,deletedata}=require("../controllers/control")

router.route("").get(checkWorking);

router.route('/fetch').get(fetch)
router.route('/fetchdata/:userId').get(fetchdata)

router.route('/postdata').get(postForm)
router.route('/post').post(postData)

router.route('/updateformdata').get(updateForm)
router.route('/update/:userId').put(updateData)
router.route('/updatemail').put(updateMail)

router.route('/delete/:userId').delete(deletedata)

module.exports=router;