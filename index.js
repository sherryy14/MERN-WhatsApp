const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const Chat = require("./models/chat.js");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(bodyParser.json());

main()
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Show all chats
app.get("/", async (req, res) => {
  let title = "Home";
  let chats = await Chat.find();
  res.render("index.ejs", { chats, title });
});

// Create new chats
app.get("/chats/new", (req, res) => {
  let title = "Create";
  res.render("new.ejs", { title });
});

// Insert new chats
app.post("/chats/create", (req, res) => {
  let { from, to, message } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    message: message,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      console.log("New chat created.");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
});

// Show edit page
app.get("/chats/:id/edit", async (req, res) => {
  let title = "Edit";
  let id = req.params.id;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat, title });
});
// Update
app.put("/chats/:id", async (req, res) => {
  let id = req.params.id;
  let { from, to, message } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { from: from, to: to, message: message },
    { new: true }
  )
    .then((res) => {
      console.log("Chat updated.");
    })
    .catch((err) => {
      console.log(err);
    });

  res.redirect("/");
});

// delete chat
app.get("/chats/:id/delete", async (req, res) => {
  let id = req.params.id;
  let deletedChat = await Chat.findByIdAndDelete(id)
    .then((res) => {
      console.log("Chat deleted");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
