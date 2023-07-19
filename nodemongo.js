const express=require("express")
const students=require("./students");
const { log } = require("console");
const app=express()

app.use(express.json())


const mongoose=require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("connected"); 

})
.catch((err)=>{
    console.log("connected to mongodb",err);
})


const port =3000;
app.listen(port,()=>{
    console.log("Server is running on port");
})


app.get('/',(req,res)=>{
    console.log(students);
    res.json({message:"Api is working..."})
})

app.get('/api/students',(req,res)=>{
    res.json(students)
})

const sch={
    id:Number,
    first_name:String,
    last_name:String,
    email:String
}

const monmodel=mongoose.model("NEWCOL",sch);
app.post('/api/students',async(req,res)=>{
    console.log("inside post function");
  
    const data=new monmodel({
        id:students.length+1,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    })
    const val=await data.save();
    
    students.push(val);
    console.log(val);
    res.json(val);
    

})

app.get('/fetchdata/:id', async function(req,res){
    try{
        fetchid=req.params.id
        const al = await monmodel.find({id:fetchid});
        res.json(al);
    } catch (err) {
      res.status(500).json({ error: 'Could not fetch data' });
    }
})

app.get('/fetch', async (req, res) => {
    try {
      const allDocuments = await monmodel.find({});
      res.json(allDocuments);
    } catch (err) {
      res.status(500).json({ error: 'Could not fetch data' });
    }
  });