const express=require("express");
const router =express.Router();

const {fta,fetch,fetchdata,postData,updateData,updateMail}=require("../controllers/control")

router.route("").get(fta);
router.route('/fetch').get(fetch)
router.route('/fetchdata/:id').get(fetchdata)

router.route('/post').post(postData)
router.route('/update/:id').put(updateData)

router.route('/updatemail').put(updateMail)

module.exports=router;





