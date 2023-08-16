const mongoose = require("mongoose")
//mongodb+srv://avanishdubeyofficail561:QprbsytJ13cdChpr@cluster1.8njtl6e.mongodb.net/
const MongoDBConnection = require('./MongoDBConnection');

async function main() {
    const dbConnection = new MongoDBConnection();
    await dbConnection.connect();

}
main().catch((error) => console.error('Error in main:', error));

const sch = {
    userId:String,
    firstName: String,
    lastName: String,
    email: String
}

const monmodel = mongoose.model("Col2", sch);

class Controlfunc {
    constructor(){
        this.k=null
    }

    async fetchAll() {
        try {
            const data = await monmodel.find({}).sort({ _id: -1 });
            return data;
        } catch (error) {
            throw error;
        }
    }
    
    
    async fetdata(idd){
        this.l=monmodel.find({ userId: idd });
        return this.l;
    
    }

    
    async postd(rb){
    
        this.data = new monmodel({
            userId: rb.userId,
            firstName: rb.firstName,
            lastName: rb.lastName,
            email: rb.email
        })
        
        this.val = await this.data.save();
        return this.val;
    
    }
    
    async updateid(uid,firstName,lastName,email){
        this.ds=monmodel.findOneAndUpdate({ userId: uid }, { $set: { firstName: firstName, lastName: lastName, email: email } }, { new: true })
        return this.ds
    }
    
    async updatem(emailid,firstName,lastName,idd){
       this.da= monmodel.updateOne({ email: emailid }, { $set: { firstName: firstName, lastName: lastName, userId: idd } }, { upsert: true })
       return this.da
    }  

    async deleteid(id,firstName,lastName,email){
        this.detetedataa=monmodel.deleteOne({userId:id})
        return this.detetedataa
    }
}


module.exports=Controlfunc;
