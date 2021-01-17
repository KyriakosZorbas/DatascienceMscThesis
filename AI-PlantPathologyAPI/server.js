require('dotenv').config()
const jwt = require('jsonwebtoken');
const config = require('./config');
const rp = require('request-promise');
var email, userid, resp;
const {PythonShell} =require('python-shell');

const getCountryISO2 = require('country-iso-3-to-2');

var fs = require('fs'),
    https = require('https'),
    express = require('express'),
    bodyParser = require('body-parser'),
    crypto = require('crypto'),
    cors = require('cors'),
    app = express();
var port = "7001"
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


console.log("Server Started ");

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var corsOptions = {
    // origin: 'http://dev.scio.services:7000',
    origin: 'http://localhost:7000',

    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

// app.options('*', cors());

app.post("/sso", function (request, response) {

    console.log("Hello from API")

    // // console.log(request.body.base64Image)
    // let base64Data = request.body.base64Image
    //
    // var imageBuffer = decodeBase64Image(base64Data);
    //
    //
    // fs.writeFile('/Images/test/leaf/upload_image.png', imageBuffer.data, function(err) {
    //
    //     console.log("err : "+err)
    // });



    response.send("{ \"totalLeafs\":\"2\", \"healthy\":\"0\", \"diseased\":\"2\", \"healthyPercentage\":\"0.9638099670410156\", \"diseasedPercentage\":\"0.03618999943137169\"}");


    // try{
    //     let options = {
    //         mode: 'text',
    //         pythonOptions: ['-u'], // get print results in real-time
    //         scriptPath: '/AI-PlantPathologyModels', //If you are having python_test.py script in same folder, then it's optional.
    //         args: ['shubhamk314'] //An argument which can be accessed in the script using sys.argv[1]
    //     };
    //
    //
    //     PythonShell.run('plant_pathology_main.py', options, function (err, result){
    //         if (err) throw err;
    //         // result is an array consisting of messages collected
    //         //during execution of script.
    //         console.log('result: ', result.toString());
    //         response.send(result.toString())
    //     });
    // } catch (e) {
    //
    //
    //     response.send("error");
    //
    // }

});




function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

