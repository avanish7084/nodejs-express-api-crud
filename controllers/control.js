const Joi = require('joi');
const { log } = require("handlebars")
const Controlfunc = require("../Models/db")
const accessControlfunc = new Controlfunc()


const sch = Joi.object({
    userId:Joi.number().min(100).max(2000).required(),
    firstName: Joi.string().min(1).max(60).trim().required(),
    lastName: Joi.string().min(1).max(60).trim().required(),
    email: Joi.string().email().required()
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

const postForm = async (req, res) => {
    try {
        console.log("Hi");
        // /res.json(allDocuments);
        res.render('form', {})

    } catch (err) {
        res.status(500).json({ error: 'Could not fetch data' });
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

const postData = async (req, res) => {
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
    console.log("inside post function");

    res.json(await accessControlfunc.postd(req.body));

}


const updateData = async (req, res) => {
    let uid = req.params.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email
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

    console.log(emailid, firstName, lastName, idd);


    try {
        const updatedmail = await accessControlfunc.updatem(emailid, firstName, lastName, idd)//await monmodel.updateOne({ email: emailid }, { $set: { firstName: firstName, lastName: lastName, id: idd } }, { upsert: true })
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
    try {
        const datadelete = await accessControlfunc.deleteid(id, firstName, lastName, email)
        if (!datadelete) {
            return res.status(404).json({ message: 'deletedata not found' });
        }

        return res.json(datadelete);
    } catch (err) {
        console.error('Error deleting data:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = { updateForm, postForm, checkWorking, fetch, fetchdata, postData, updateData, updateMail, deletedata }