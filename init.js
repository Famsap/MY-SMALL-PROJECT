const mongoose = require("mongoose");
const Chat = require("./models/chats");




main().then(() => {
    console.log("connected to mongodb");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}




let AllChats = [
    {
    from: "Zuber",
    to: "Faisal",
    msg:"Heyy I am zuber Ahmed",
    Created_At: new Date()
    },
    {
    from: "Sameer",
    to: "Faisal",
    msg:"I was busy yesterday",
    Created_At: new Date()
    },
    {
    from: "Shakeel",
    to: "Faisal",
    msg:"Where are you",
    Created_At: new Date()
    },
    {
    from: "Noushad",
    to: "Faisal",
    msg:"I am coming there",
    Created_At: new Date()
    },
];


const result = await Chat.insertMany(AllChats);