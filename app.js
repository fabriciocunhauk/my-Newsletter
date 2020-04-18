const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const htpps = require("https");

const app = express();

//specifies a static folder which contains css.style and images
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

let data = {
  members: [
    {
      email_address: email,
      stasus: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);

const url = "https://us19.api.mailchimp.com/3.0/lists/e40bb885fd";

const options = {
  method: "POST",
  auth: "fabricio:3e533faa5c1e2a592d950225c553b2a1-us19"
}

const request = htpps.request(url, options, function(response){

  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }

  response.on("data", function(data){
    console.log(JSON.parse(data));
  });
});

request.write(jsonData);
// request.write (jsonData)
request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/")
});

app.listen(process.env.PORT || 3000, function(){
  console.log("server runing");
});

// API Key
// 3e533faa5c1e2a592d950225c553b2a1-us19

//List ID
//e40bb885fd
