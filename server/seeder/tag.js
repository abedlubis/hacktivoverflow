const Tag = require('../models/tag');
var mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost/activoverflow-dev`);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`connected to activoverflow-dev`)
});


Tag.collection.insertMany([
    {
        "name" : "Javascript",
    },
    {
        "name" : "Java",
    },
    {
        "name" : "C#",
    },
    {
        "name" : "C",
    },
    {
        "name" : "CPP",
    }
], function(err, result){
    if(err) console.log(err)
    console.log('seed created')
})
