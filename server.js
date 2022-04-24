// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  var moment = require('moment'); // require
//"Fri, 25 Dec 2015 00:00:00 GMT"
  try{
    let response = null;
    const dateParam = req.params.date;

    // empty catch
    if(undefined == dateParam || '' == dateParam) {
      response = {
        unix: parseInt(moment.utc().format('x')),
        utc: moment.utc()
      }
    }
    else {
      if(isNaN(dateParam)) {
        if( moment(dateParam).isValid()) {
          let t = moment.utc(dateParam).format('x');
          t = parseInt(t);
          response = {
            unix: t,
            utc: moment.utc(dateParam).format("ddd, DD MMM YYYY") + ' 00:00:00 GMT'
          }
        }else {
          throw new Error('Invalid Date');
        }
      }else {
        if(dateParam.toString().length == 13) {
          response = {
            unix: parseInt(dateParam),//+'000'
            utc: moment.utc(parseInt(dateParam)).format("ddd, DD MMM YYYY") + ' 00:00:00 GMT'
          }
        }else {
          throw new Error('Invalid Date');
        }
      }
    }
    
    res.json(response);

 }catch(err){
   res.json({
     error: err.message
   })
 }
  
});


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
