const mongoose = require("mongoose");
mongoose.connect('mongodb://0.0.0.0:27017/registration-form', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log("Connection successful")
}).catch((e)=>{
    console.log("! Not Connect")
})

