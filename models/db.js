require('dotenv').config()
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

//mongodb+srv://avanishdubeyofficail561:QprbsytJ13cdChpr@cluster1.8njtl6e.mongodb.net/
const MongoDBConnection = require('./MongoDBConnection');
const { number } = require("joi");
const { log } = require("handlebars/runtime");


async function main() {
    const dbConnection = new MongoDBConnection();
    await dbConnection.connect();

}
main().catch((error) => console.error('Error in main:', error));

const schema = new mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    password: String,
    tokens:[{token:String}]
});

//console.log("HIIi")
// Generating token
schema.methods.generateAutotoken=async function(){

    try{
       // console.log("DFa")
        const token=jwt.sign({_id:this._id.toString()},process.env.SECERATE_KEY)
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token
    }
    catch(error){
        
        console.log("Error occured",+error)
    }

}


schema.pre("save", async function (next) {

    if (this.isModified("password")) {
        //console.log(`current pass. is ${this.password}`)
        this.password = await bcrypt.hash(this.password,10 )
        //console.log(`current pass. is ${this.password}`)
    }

    next();
})

const monmodel = mongoose.model("registrionPart1", schema);



class Controlfunc {
    constructor() {
        this.k = null
    }

    async fetchAll() {
        try {
            const data = await monmodel.find({}).sort({ _id: -1 });
            return data;
        } catch (error) {
            throw error;
        }
    }


    async fetdata(idd) {
        this.l = monmodel.find({ userId: idd });
        return this.l;

    }
    async checkData(userId) {
        const data = monmodel.findOne({ userId })
        
        return data
    }

    async postd(rb,res) {
        const newData = new monmodel({
            userId: rb.userId,
            firstName: rb.firstName,
            lastName: rb.lastName,
            email: rb.email,
            gender: rb.gender,
            password: rb.password
        });

        const token = await newData.generateAutotoken();
        // console.log("Token: ", token);

        res.cookie('jwtToken', token, {expires:new Date(Date.now()+30000), httpOnly: true });
        //console.log("Cookies: ",cookie)

        const savedData = await newData.save();
        return savedData;
    }

    async updateid(uid, firstName, lastName, email) {
        this.ds = monmodel.findOneAndUpdate({ userId: uid }, { $set: { firstName: firstName, lastName: lastName, email: email } }, { new: true })
        return this.ds
    }

    async updatem(emailid, firstName, lastName, idd) {
        this.da = monmodel.updateOne({ email: emailid }, { $set: { firstName: firstName, lastName: lastName, userId: idd } }, { upsert: true })
        return this.da
    }

    async deleteid(id, firstName, lastName, email) {
        this.detetedataa = monmodel.deleteOne({ userId: id })
        return this.detetedataa
    }
}


module.exports = Controlfunc;


