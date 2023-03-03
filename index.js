const Mailchimp = require('mailchimp-api-v3');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"))

let port = process.env.PORT || 3000;

const mailchimpKey = "3acd9d107f75d415dd442968e21043ef-us21";


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/singup.html");
});

app.post("/", function (req, res) {
    const fName = req.body.fname;
    const lName = req.body.lname;
    const email = req.body.email;

    mailchimp.post('/lists/7082b96729/members', {
        email_address: email,
        status: 'subscribed',
        email_type: 'html',
        merge_fields: {
            FNAME: fName,
            LNAME: lName
        }
    }).then(function (results) {
        res.sendFile(__dirname + "/success.html");
    }).catch(function (err) {
        res.sendFile(__dirname + "/failure.html");
    });

});

const mailchimp = new Mailchimp(mailchimpKey);

// mailchimp KEy : 3acd9d107f75d415dd442968e21043ef-us21
// id : 7082b96729


app.listen(port, () => {
    console.log("Server running on 3000 port.");
});
