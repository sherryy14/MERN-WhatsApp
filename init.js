const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main().then(()=>{
    console.log('connection success');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


let allChats = [
    {
        from: "Sherry",
        to: "Ali",
        message: "Hi Dude!",
        created_at: new Date()
    },
    {
        from: "Kashif",
        to: "Jerry",
        message: "Project done!",
        created_at: new Date()
    },
    {
        from: "Can",
        to: "Ben",
        message: "Mobile application completed!",
        created_at: new Date()
    },
    {
        from: "John",
        to: "Smith",
        message: "Vape website.",
        created_at: new Date()
    }
]

Chat.insertMany(allChats);