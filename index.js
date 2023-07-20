const express=require("express")
const fs=require("fs");
const { escape } = require('querystring')
const app=express()
const { finished } = require('stream')
app.use(express.json())



const port=3000;

app.listen(port,()=>{
<<<<<<< HEAD
    console.log("Server is running on http://localhost:${port}");
=======
    console.log("Working");
>>>>>>> d876fa32b1f53f6a3474c3858e2f8e0590a0aa5f
})

app.get("/",(req,res)=>{
    res.send("Hello, Now I am live")
})

app.get("/api/students",async(req,res)=>{

    await fs.readFile('data.json',  'utf8', (err,data) => {
        if (err) {
            console.error('Error writing JSON file:', err);
            return;
        }
        console.log("Json Data",data)
        res.json(data)
    
})
})

// app.post("/api/students",(req,res)=>{
//     console.log("HTTP post request received");
// })


app.post('/api/students', (req, res) => {
    const body = req.body;
    // console.log("-------------------------")
    console.log(req.body);

    fs.writeFile('data.json', JSON.stringify(req.body), 'utf8', (err) => {
    if (err) {
        console.error('Error writing JSON file:', err);
        return;
    }

    
    console.log('JSON file has been saved!');
    return res.json({status: true, message: 'JSON file has been saved!'})
    });

});
