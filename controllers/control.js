
const {monmodel} = require("../models/model");



const fta = async (req, res) => {
    res.json({ message: "Api is working..." })
}

const fetch = async (req, res) => {
    try {
        const allDocuments = await monmodel.find({});
        res.json(allDocuments);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch data' });
    }
}

const fetchdata = async (req, res) => {
    try {
        fetchid = req.params.id
        const al = await monmodel.find({ id: fetchid });
        res.json(al);
    } catch (err) {
        res.status(500).json({ error: 'Could not fetch data' });
    }
}

const postData = async (req, res) => {
    console.log("inside post function");

    const data = new monmodel({
        id: 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
    const val = await data.save();

    console.log(val);
    res.json(val);


}

const updateData = async (req, res) => {
    const uid = req.params.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email

    try {
        const updatedata = await monmodel.findOneAndUpdate({ id: uid }, { $set: { first_name: first_name, last_name: last_name, email: email } }, { new: true })
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
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let idd = req.body.id;

    console.log(emailid, first_name, last_name, idd);


    try {
        const updatedmail = await monmodel.updateOne({ email: emailid }, { $set: { first_name: first_name, last_name: last_name, id: idd } }, { upsert: true })
        return res.json(updatedmail);

    } catch (err) {
        console.error('Error updating updatedmail:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }



}


module.exports = { fta, fetch, fetchdata, postData, updateData, updateMail }

