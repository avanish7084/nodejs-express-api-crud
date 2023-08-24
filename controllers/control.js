const express=require("express")
const app=express()
const cookieParser=require("cookie-parser")
const Joi = require('joi');
const { log } = require("handlebars")
const Controlfunc = require("../Models/db")
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cookieParser());



const accessControlfunc = new Controlfunc()


const JOI = Joi.object({
    userId: Joi.string().min(1).max(2000).required(),
    firstName: Joi.string().min(1).max(60).trim().required(),
    lastName: Joi.string().min(1).max(60).trim().required(),
    email: Joi.string().email().required(),
    gender: Joi.string().required(),
    password: Joi.string().required()
})


const checkWorking = async (req, res) => {
    res.json({ message: "Api is working..." })
}

const fetch = async (req, res) => {
    try {
        const allDocuments = await accessControlfunc.fetchAll()
        // /res.json(allDocuments);
        res.render('userList', { allDocuments })

    } catch (err) {
        res.status(500).json({ error: 'Could not fetch data' });
    }
}

const loginpage = async (req, res) => {
    try {
        res.render('loginPage', {})

    }
    catch (err) {
        res.status(500).json({ error: 'you can not login due to 500 error' });
    }
}


const postForm = async (req, res) => {
    try {
        console.log("Hi");
        // /res.json(allDocuments);
        res.render('form', {})

    } catch (err) {
        res.status(500).json({ error: 'Could not fetch data' });
    }
}

const checkData = async (req, res) => {
    const { userId, password } = req.body;
    // console.log("Qwefwef",userId,password)
    try {
        const user = await accessControlfunc.checkData(userId);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log(user.password)
        if (await bcrypt.compare(password, user.password)) {
            
            const token =await user.generateAutotoken()
        
            return res.json({ token: token, status: true });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}


function getcookie(req) {
    var cookie = req.headers.cookie;
    // user=someone; session=mySessionID
    return cookie.split(';');
}
const verifyToken=async (req,res)=>{
    
    var cookie1 = getcookie(req);     // get whole cookies
    console.log(typeof(cookie1));  
    var whole_token = cookie1[0];     // access first cookie
    var token=whole_token.split("=")  // sepreating name and values
    const token_value=token[1]        // store token 
    // console.log(token_value)
    if (!token_value) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
            const decoded = jwt.verify(token_value,process.env.SECERATE_KEY);
            req.user = decoded;
            // console.log(req.user,"sdbjasTTTTTTTT",decoded)
            res.render('homepage', { user: req.user });
    } catch (error) {
            return res.status(403).json({ message: 'Invalid token' });
    }
    
}


const updateForm = async (req, res) => {
    try {
        console.log("Hey update");
        // /res.json(allDocuments);
        res.render('updateForm', {})

    } catch (err) {
        res.status(500).json({ error: 'Could not fetch data' });
    }
}

const fetchdata = async (req, res) => {
    try {
        fetchid = req.params.userId
        const al = await accessControlfunc.fetdata(fetchid)
        res.json(al);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch data' });
    }
}

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.jwtToken;
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     try {
//         const decoded = jwt.verify(token, 'yourSecretKey');
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(403).json({ message: 'Invalid token' });
//     }
// };
const postData = async (req, res) => {
    try {
        let data = req.body;
        const validationResult = JOI.validate(data);

        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.details[0].message });
        }
    }
    catch (error) {
        console.log(error)
    }
    console.log("inside post function");

    res.json(await accessControlfunc.postd(req.body,res));

}


const updateData = async (req, res) => {
    let uid = req.params.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email
    try {
        let data = req.body;
        const validationResult = sch.validate(data);

        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.details[0].message });
        }
    }
    catch (error) {
        console.log(error)
    }
    try {
        const updatedata = await accessControlfunc.updateid(uid, firstName, lastName, email)
        if (!updatedata) {
            return res.status(404).json({ message: 'updatedata not found' });
        }

        return res.json(updatedata);
    } catch (err) {
        console.error('Error updating updatedata:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateMail = async (req, res) => {

    let emailid = req.body.email;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let idd = req.body.userId;
    let gender = req.body.gender;
    let password = req.body.password;

    console.log(emailid, firstName, lastName, idd);


    try {
        const updatedmail = await accessControlfunc.updatem(emailid, firstName, lastName, idd, gender, password)//await monmodel.updateOne({ email: emailid }, { $set: { firstName: firstName, lastName: lastName, id: idd } }, { upsert: true })
        return res.json(updatedmail);

    } catch (err) {
        console.error('Error updating updatedmail:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}

const deletedata = async (req, res) => {
    let id = req.params.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email
    let gender = req.body.gender;
    let password = req.body.password;
    try {
        const datadelete = await accessControlfunc.deleteid(id, firstName, lastName, email, gender, password)
        if (!datadelete) {
            return res.status(404).json({ message: 'deletedata not found' });
        }

        return res.json(datadelete);
    } catch (err) {
        console.error('Error deleting data:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = {verifyToken, checkData, loginpage, updateForm, postForm, checkWorking, fetch, fetchdata, postData, updateData, updateMail, deletedata }