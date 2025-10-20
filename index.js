const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodoverride=require("method-override");
app.use(methodoverride('_method'));
app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

main().then(()=>console.log("connection successful::"))
     .catch(err=>console.log(err));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/chatUI');
    
}
app.get("/",(req,res)=>{
    res.send("rout is working");

})
app.get("/chats",async(req,res)=>{
  let chats= await Chat.find();
  res.render("index.ejs",{chats});

})
app.delete("/chats/:id",(req,res)=>{
    let {id}=req.params;
    Chat.findByIdAndDelete(id).then(()=>{
        console.log("chat deleted");
        res.redirect("/chats");
    }).catch((err)=>{
        console.log("error in deleting chat:",err);
    }   );

});
app.post("/chats",(req,res)=>{
    let {from,msg,to}=req.body;
    let newchat = new Chat({
        from :from,
        to:to,
        msg:msg,
        created_at:new Date()
    })
    newchat.save().then(()=>{
        console.log("chat saved");
    }).catch((err)=>{
        console.log("error in saving chat:",err);
    });
    res.redirect("/chats");

});
app.get("/chats/:id/edit",async(req,res)=>{
    let {id} =req.params;
    let chat = await Chat.findById(id);

    res.render("edit.ejs",{chat});

})
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");


})
app.put("/chats/:id",async(req,res)=>{
    let {id }=req.params;
    let {from,to,msg}=req.body;
   let chat= await Chat.findByIdAndUpdate(id,{
        from:from,
        to:to,
        msg:msg
    });
    chat.save();
    res.redirect("/chats");
    })
app.listen(port,()=>{
    console.log(`server is on baby:`);

});
