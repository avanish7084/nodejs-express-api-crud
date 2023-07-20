const mongoose=require("mongoose")
class MongoDBConnection {
  constructor() {
    // Update the connection string and database name with your actual MongoDB settings
    this.connectionString = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1';
    this.databaseName = 'Newdatabase';
    this.client = null;
  }

  async connect() {
    try {
      this.client = await mongoose.connect(this.connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
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
