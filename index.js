const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require('./models/chats.js');
app.use(express.urlencoded({extended: true}));   ///We are writing this line to parse the data received from the post route..
const methodOverride = require("method-override");  //We are writing this to use th PUT function in Ejs

// getting-started.

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"public")));  //To Attach the css file present in the public folder to the index.ejs
app.use(methodOverride("_method"));  // Here we use the method override function..
main().then(() => {
    console.log("connected to mongodb");
})
.catch(err => console.log(err));



// getting-started.js

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Index Route

app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
   // console.log("Chats being sent to EJS:", chats);
    res.render("index", { chats });
});

//New Route

app.get("/chats/new", (req,res)=>{
    res.render("new.ejs")
})

//Create Route
app.post("/chats", (req, res)=>{
    let {from, to , msg} = req.body;  // This we write to take the input data submitted in the page....
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        Created_At: new Date()
    })
    newChat.save().then(res =>{
        console.log("Chat was saved");
    }).catch((err)=>{
        console.log("Error");
    });
    res.redirect("/chats");
});

//Edit Route
app.get("/chats/:id/edit", async (req , res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);    //Find by id is asynchronys function so we use await function
    res.render("Edit.ejs", {chat});
});


//Update Route

app.put("/chats/:id", async (req , res)=>{
    let {id}= req.params;
    let {newmsg} = req.body;
    let { updatedChat}= await Chat.findByIdAndUpdate(  //This is the update function which is Asynchronise that is why we are using the await funtion here..
        id,
        {msg: newmsg},
        {runValidators: true}
    );
    res.redirect("/chats");
});


//Detroy Route

app.delete("/chats/:id", async(req, res) => {
    let {id} = req.params;
    let deletedChats = await Chat.findByIdAndDelete(id);
    console.log(deletedChats);
    res.redirect("/chats");
});


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port , ()=>{
    console.log("serever is listening on port " + port);
});