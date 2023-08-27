const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
port = process.env.port || 3000
require("./db/conn")
const Register = require("./model/userresiter");




const static_path = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")

app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path))
app.set("view engine","hbs")
app.set("views",template_path)
hbs.registerPartials(partials_path)

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register",async(req,res)=>{
    try{
        const registerEmployee = new Register({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email,
            password:req.body.password,
            
        }) 
        const registered = await registerEmployee.save();
        res.status(201).render("register")

    }catch(err){
        res.status(400).send(err)
    }
})

// login Craetion
app.post("/login",async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const userEmail= await Register.findOne({email:email});
        if(userEmail.password == password){
            res.status(201).render("index")
        }else{
            res.send("User Not Found !")
        }            

    }catch(err){
     res.status(400).send(err)
        }

    })


app.listen(port, ()=>{
    console.log(`the listing the port number ${port}`)
})