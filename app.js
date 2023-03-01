const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


const username = "admin-kck";
const password = "manuganu";
const cluster = "cluster0";
const dbname = "Test";

mongoose.set('strictQuery', true);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// const url = "mongodb+srv://cluster0.mabpgbb.mongodb.net/Test";
const url = `mongodb+srv://${username}:${password}@${cluster}.mabpgbb.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true }, function (err) {
    if (!err) {
        console.log("Success");
    } else {
        console.log(err.message);
    }
});

const userSchema = new mongoose.Schema({
    dp: String,
    userName: String,
    Name: String,
    email: String,
    Role: String,
    Status: String,
    Company: String
});

const User = mongoose.model("User", userSchema);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/security.html", function (req, res) {
    res.sendFile(__dirname + "/security.html");
});

app.get("/info.html", function (req, res) {
    res.sendFile(__dirname + "/info.html");
});

app.post("/", function (req, res) {
    const imgFile = req.body.dp;
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const status = req.body.status;
    const company = req.body.company;

    const user = new User({
        Name: name,
        dp: imgFile,
        userName: username,
        Status: status,
        Company: company,
        email: email
    });

    try {
        User.insertMany(user, function (err) {
            if (!err) {
                console.log("success");
                // alert("successfully added the user!!");
                // alert("successfully added the user!!");
                res.redirect("/");
            } else {
                console.log(err.message);
            }
        });
    } catch (err) {
        console.log(err);
    }

    // console.log(imgFile,name,username,status,company,email); 
});

app.listen(3000, function () {
    console.log("Server at port : 3000");
});