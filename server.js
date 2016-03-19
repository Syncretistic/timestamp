'use strict';

var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/:date', function(req,res){
  var data=req.params.date;
  var final ={
    unix: null,
    natural: null
  }
  if(isNaN(data)){ //handles natural language date
  var unixtime= Date.parse(data)/1000;
  if(isNaN(unixtime)){
    res.send(final);
  }
    final.natural=data;
    final.unix=unixtime;
    res.send(final);
  } else { //handles unix timestamp
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var date=new Date(data*1000);
    var final={
      unix: parseInt(data),
      natural: months[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear()
    }
    res.send(final);
  }
  
});
app.listen(8080, function () {
    console.log('Listening on port 8080...');
});