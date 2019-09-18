const   express = require("express"),
        app     = express(),
        fs = require('fs'),
        mongoose = require("mongoose");

app.set("view engine", "ejs");
const port = process.env.PORT
let dev_db_url = process.env.DB;

let mongoDB = process.env.MONGODB_URI || dev_db_url;
var Schema = mongoose.Schema;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.model('incidents', new Schema({ year: Number,
    month: String,
    date: Number,
    dead: Number,
    injured: Number,
    type: String,
    location: String,
    details: String,
    perpetrator: String,
    partOf: String}, 
    { collection : 'cases' }));

var incidents = mongoose.model('incidents');
console.log("==============================");


var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



// DEATH
var data2015 = [];
var data2016 = [];
var data2017 = [];
var data2018 = [];
var dataS = 0;

incidents.find({year: '2015'}, function(err, data){
    if(err)
        console.log(err);
    else{
        let c = 0;
        for(let month of months){
            for(let D of data){
                if (month == D.month){
                    // console.log(D.dead);
                    dataS = dataS + D.dead;
                    // console.log(dataS);
                }
                data2015[c] = {
                    "value": dataS
                };
            }
            dataS = 0;
            c++;
        }
        // console.log(data2015);
    }
});

incidents.find({year: '2016'}, function(err, data){
    if(err)
        console.log(err);
    else{
        let c = 0;
        for(let month of months){
            for(let D of data){
                if (month == D.month){
                    // console.log(D.dead);
                    dataS = dataS + D.dead;
                }
                data2016[c] = {
                    "value": dataS
                };
            }
            dataS = 0;
            c++;
        }
        // console.log(data2016);
    }
});

incidents.find({year: '2017'}, function(err, data){
    if(err)
        console.log(err);
    else{
        let c = 0;
        for(let month of months){
            for(let D of data){
                if (month == D.month){
                    // console.log(D.dead);
                    dataS = dataS + D.dead;
                }
                data2017[c] = {
                    "value": dataS
                };
            }
            dataS = 0;
            c++;
        }
        // console.log(data2017);
    }
});

incidents.find({year: '2018'}, function(err, data){
    if(err)
        console.log(err);
    else{
        let c = 0;
        for(let month of months){
            for(let D of data){
                if (month == D.month){
                    // console.log(D.dead);
                    dataS = dataS + D.dead;
                }
                data2018[c] = {
                    "value": dataS
                };
            }
            dataS = 0;
            c++;
        }
        // console.log(data2018);
    }
});

var dataD = { data2015, data2016, data2017, data2018};

app.get("/death-wise", function(req, res){
    console.log("Sending...");
    res.render("dead", {data:dataD});
});

// INJURY
var data_2015 = [];
var data_2016 = [];
var data_2017 = [];
var data_2018 = [];
var data_S = 0;

incidents.find({year: '2015'}, function(err, data){
    if(err)
        console.log(err);
    else{
        let c = 0;
        for(let month of months){
            for(let D of data){
                if (month == D.month){
                    // console.log(D.injured);
                    data_S = data_S + D.injured;
                    // console.log(data_S);
                }
                data_2015[c] = {
                    "value": data_S
                };
            }
            data_S = 0;
            c++;
        }
        // console.log(data_2015);
    }
});

incidents.find({year: '2016'}, function(err, data){
    if(err)
        console.log(err);
    else{
        let c = 0;
        for(let month of months){
            for(let D of data){
                if (month == D.month){
                    // console.log(D.injured);
                    data_S = data_S + D.injured;
                    // console.log(data_S);
                }
                data_2016[c] = {
                    "value": data_S
                };
            }
            data_S = 0;
            c++;
        }
        // console.log(data_2016);
    }
});

incidents.find({year: '2017'}, function(err, data){
    if(err)
        console.log(err);
    else{
        let c = 0;
        for(let month of months){
            for(let D of data){
                if (month == D.month){
                    // console.log(D.injured);
                    data_S = data_S + D.injured;
                    // console.log(data_S);
                }
                data_2017[c] = {
                    "value": data_S
                };
            }
            data_S = 0;
            c++;
        }
        // console.log(data_2017);
    }
});

incidents.find({year: '2018'}, function(err, data){
    if(err)
        console.log(err);
    else{
        let c = 0;
        for(let month of months){
            for(let D of data){
                if (month == D.month){
                    // console.log(D.injured);
                    data_S = data_S + D.injured;
                    // console.log(data_S);
                }
                data_2018[c] = {
                    "value": data_S
                };
            }
            data_S = 0;
            c++;
        }
        // console.log(data_2018);
    }
});

var data_D = { data_2015, data_2016, data_2017, data_2018};




app.get("/injury-wise", function(req, res){
    console.log("Dead");
    res.render("injured", {data:data_D});
});





app.get("/", function(req, res){
    console.log("Home");
    res.render("index");
});



app.listen(port, function(){
    console.log("The MonGo Server Has Started!");
});