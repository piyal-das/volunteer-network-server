const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config()
const { ObjectId } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rrq7z.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
app.use(bodyParser.json())
app.use(cors())

client.connect(err => {
  const eventsCollection = client.db(`${process.env.DB_NAME}`).collection("volunteer");
  const volunteersCollection = client.db(`${process.env.DB_NAME}`).collection("volunteers");
 
  
  
    app.post('/addEvent', (req,res) => {
        const event = req.body
        eventsCollection.insertOne(volunteer)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    })

    app.get('/events',(req,res) => {
        eventsCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    app.get('/getEvent/:id', (req,res) => {
        eventsCollection.find({_id: ObjectId(req.params.id)})
        .toArray((err, documents) => {
            res.send(documents[0])
        })
    })

    app.post('/addVolunteer',(req,res) => {
        const volunteer = req.body
        volunteersCollection.insertOne(volunteers)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    })
    app.get('/volunteers', (req,res) => {
        volunteersCollection.find({email: req.query.email})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    app.get('/volunteers', (req,res) => {
        if(req.query.email === "piyas3977@gmail.com"){
            volunteersCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
        }
    })


    app.delete('/deleteVolunteers/:id',(req,res) => {
        volunteersCollection.deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
            res.send(result.deletedCount > 0)
            res.redirect('/')
        })
    })

    app.delete('/deleteVolunteer/:id',(req,res) => {
        volunteersCollection.deleteOne({_id: ObjectId(req.params.id)})
        .then(result => {
            res.send(result.deletedCount > 0)
            res.redirect('/')
        })
    })

});
