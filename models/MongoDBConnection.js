const mongoose=require("mongoose")
class MongoDBConnection {
  constructor() {

    // Update the connection string and database name with your actual MongoDB settings
    this.connectionString = 'mongodb+srv://avanishdubeyofficail561:${process.env.Mongocloud_password}@cluster1.8njtl6e.mongodb.net/';
    
    this.client = null;
  }

  async connect() {
    try {
      this.client = await mongoose.connect(this.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      //return this.client.db
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  

  async close() {
    try {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    }
  }
}

module.exports = MongoDBConnection;

// async function main() {
//   const dbConnection = new MongoDBConnection();
//   let db = dbConnection
//   module.exports = db;

// }


