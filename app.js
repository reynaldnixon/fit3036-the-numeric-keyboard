//The base of this code is based from my previous assignment from FIT3140 Advance Programming
//In FIT3140, we were taught on how to use socket.io for real-time data transfer between client and server
//In which here i try to implement what i learn in this project.

//Initializing variables that are required by the app
var express = require("express");   //Requires express 
var app = express();
var router = express.Router();
var path = __dirname;
var ejs= require('ejs');    //requires ejs
var fs = require('fs');     //requires file system
var server = require('http').createServer(app);
var io = require('socket.io')(server);  //initializing socket.io 


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(express.static('public')); //use static file directory to fetch picture and CSS files

router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
});

//When a user open the localhost site, send them the editor.html page
app.get("/",function(req,res) {
    res.sendFile(path + "/editor.html")
});

// // if website path is unknown, throw user to 404 page
app.use("*",function(req,res){
    res.sendFile(path + "/404.html");
});

var array = []; //Initializing empty array to be used in storing user's inputs
var letter; // Initializing variable letter to be used in mapper function

//Socket.io code, accepting user input and sending it between client and server in real-time
io.on('connection', function(client) {

    //On the event "message" which is new user input, log the input into the console and keep it in an array
    //Also send back the input by user to the client
    client.on('message', function(data) {
        console.log("we got new input from client : " + data);

        array.push(data); //Push user input into an array
        console.log("Current Array Value: " + array + "\n"); //Logs what is inside current array
        io.emit('broad', data); //Send back user input to be display in client via socket.io
    });

    //On the event "enter" which is user pressing enter key, join the content of the array into string,
    //Empty the array and pass currentValue into the mapper function
    //Send the result which is a letter back to the client's text editor. Also logs the result in console
    client.on('enter', function(data){
        console.log("enter command received");
        currentValue = array.join(); //Joining array contents into a string
        array = []; //resetting the array for next key combinations

        character = mapper(currentValue); //Send currentValue into mapper function

        console.log("letter is: " + character + "\n");
        io.emit('letter',character); //Send 
    });
});

//The main function of the code, accept the input of a string from currentValue and
//compares it with the key combination dictionary, if it matches then send corresponding letter
//If it doesn't match anything in the key combination, resets the user input and ask user to enter new combination
function mapper(currentValue){
        if (currentValue === "1"){
            letter = "E";
        }

        else if (currentValue === "2"){
            letter = "A";
        }

        else if (currentValue === "3"){
            letter = "R";
        }

        else if (currentValue === "4"){
            letter = "I";
        }

        else if (currentValue === "5"){
            letter = "O";
        }

        else if (currentValue === "6"){
            letter = "T";
        }

        else if (currentValue === "7"){
            letter = "N";
        }

        else if (currentValue === "8"){
            letter = "S";
        }

        else if (currentValue === "9"){
            letter = "L";
        }

        else if (currentValue === "1,2"){
            letter = "C";
        }

        else if (currentValue === "2,3"){
            letter = "U";
        }

        else if (currentValue === "1,4"){
            letter = "D";
        }

        else if (currentValue === "2,5"){
            letter = "P";
        }

        else if (currentValue === "3,6"){
            letter = "M";
        }

        else if (currentValue === "4,5"){
            letter = "H";
        }

        else if (currentValue === "5,6"){
            letter = "G";
        }

        else if (currentValue === "4,7"){
            letter = "B";
        }

        else if (currentValue === "5,8"){
            letter = "F";
        }

        else if (currentValue === "6,9"){
            letter = "Y";
        }

        else if (currentValue === "7,8"){
            letter = "W";
        }

        else if (currentValue === "8,9"){
            letter = "K";
        }

        else if (currentValue === "7,5"){
            letter = "V";
        }

        else if (currentValue === "9,5"){
            letter = "X";
        }

        else if (currentValue === "1,5"){
            letter = "Z";
        }

        else if (currentValue === "3,5"){
            letter = "J";
        }

        else if (currentValue === "1,2,5"){
            letter = "Q";
        }

        else if (currentValue === "1,1"){
            letter = "1";
        }

        else if (currentValue === "2,2"){
            letter = "2";
        }

        else if (currentValue === "3,3"){
            letter = "3";
        }

        else if (currentValue === "4,4"){
            letter = "4";
        }

        else if (currentValue === "5,5"){
            letter = "5";
        }

        else if (currentValue === "6,6"){
            letter = "6";
        }

        else if (currentValue === "7,7"){
            letter = "7";
        }

        else if (currentValue === "8,8"){
            letter = "8";
        }

        else if (currentValue === "9,9"){
            letter = "9";
        }

        else if (currentValue === "0"){
            letter = " ";
        }

        else if (currentValue === "0,0"){
            letter = "0";
        }

        else if(currentValue === "9,6,5,4"){
            letter = "\n";
        }

        else if(currentValue === "backspace"){
            letter = "backspace";
        }

        else {
            letter = "";
        }
    return letter;
}

// server listening in port 3000
server.listen(3000, function () {
    console.log("Live at Port 3000");
});





