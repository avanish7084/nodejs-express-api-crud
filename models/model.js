const mongoose = require("mongoose")

const MongoDBConnection = require('./MongoDBConnection');

 

async function main() {
    const dbConnection = new MongoDBConnection();
    await dbConnection.connect();

}
main().catch((error) => console.error('Error in main:', error));

const sch = {
    id: Number,
    first_name: String,
    last_name: String,
    email: String
}

const monmodel = mongoose.model("Col2", sch);


module.exports={monmodel}

