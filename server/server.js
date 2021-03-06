const express = require('express')
const app = express()
const port = 3000

const {MongoClient} = require('mongodb');
const cors = require('cors')

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));

app.get('/', function(req, res){
    main().catch(console.error);
    res.send('hello world');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/schedule', function(req, res) {
    let userId = req.param('user').toLowerCase();
    console.log(userId);
    var MongoClient = require('mongodb').MongoClient;
    var url = MongoUrl;

    let resultObject = {};

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("GroupSchedules").findOne({'schedArray.schedules.userID':userId}, function(err, result) {
            if (err) throw err;
            let schedules = result['schedArray'][0]['schedules'];
            for (let i = 0; i < schedules.length; i++) {
                if (schedules[i]['userID'] == userId) {
                    resultObject['calendarID'] = schedules[i]['calendarID'];
                    resultObject['displayID'] = schedules[i]['displayID'];
                }
            }
            if (typeof resultObject.calendarID === "undefined") {
                resultObject['calendarID'] = "none";
                resultObject['displayID'] = "none";
            }
            
            res.send(resultObject);
        });
    });
});


async function listDatabases(client){
    const db = client.db("test");
    
    databasesList = await client.db().admin().listDatabases();
  
    console.log("Databases:");
    console.log(databasesList);
};

async function getSchedules(client, userId) {
    const db = client.db("test");
    db.collection("GroupSchedules").findOne({'schedArray.schedules.userID':userId}, function(err, result) {
        if (err) throw err;
        console.log(result);
    });
};

