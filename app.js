const express = require("express");
const bodyParser = require("body-parser")
const https = require("https")
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post('/', function(req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.sName;
    var email = req.body.email;
    console.log(email);
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    const options = {
        method: "POST",
        auth: "George:9121cc5db8d77e31007edc76fd821a42-us14",

    }
    var jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/3c977d8044";
    const request = https.request(url, options, function(response) {
        response.on("data", function(data) {
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData)
    request.end();
})
app.listen(process.env.PORT || 3000, function() {
    console.log("server running on port 3000")
})

// 9121cc5db8d77e31007edc76fd821a42-us14
// audience id= 3c977d8044