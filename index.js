const express=require("express")
const { log } = require("console");
const app=express()
app.use(express.json())

const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
app.engine('handlebars',exphbs.engine({
    defaultLayout: 'main',
    // ...implement newly added insecure prototype access
    handlebars: allowInsecurePrototypeAccess(Handlebars)
    }))
app.set('view engine','handlebars')


const data=require("./routes/router")
app.use("/api",data)

// // Rendering Static Files
// const path=require("path")
// const staticPath=path.join(__dirname,"")
// app.use(express.static(staticPath));


// Rendring Dynamic file with the help of handlebars
// app.set('view engine','hbs')
// app.get('/dynamicData', (req, res) => {
//     res.render('index',"");
// });



const port =5000;
app.listen(port,()=>{
    console.log("Server is running on port");
})
