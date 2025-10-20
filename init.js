const mongoose = require("mongoose");
const chat =require("./models/chat.js");

main().then(()=>console.log("connection successful::"))
     .catch(err=>console.log(err));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/chatUI');
    
}

let chat1 = new chat({
    from :"meha",
    to:"priya",
    msg :"send methis pdf and all bitch",
    date:new Date()
},
{from :"meha",
    to:"priya",
    msg :"send methis pdf and all bitch",
    date:new Date()},
{from :"priya",
    to:"meha",
    msg :"okk babe",
    date:new Date()});

chat.insertMany([chat1]);