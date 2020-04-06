const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());


const uri = process.env.DB_PATH


let client = new MongoClient(uri, { useNewUrlParser: true });
const users = ['Rumi', 'Sumi', 'Riya', 'Rita', "Rimi"]


// GET
app.get('/products', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true });
       // database connection
        client.connect(err => {
        const collection = client.db("online-store").collection("items");
        collection.find().toArray((err, documents) =>{
           if(err){
               console.log(err);
               res.status(500).send({message:err})
           }
           else{
            res.send(documents);
           }
        });
        client.close();
    });
    // database connection
});


app.get('/product/:key', (req, res) => {
   const key = req.params.key;
 
   client = new MongoClient(uri, { useNewUrlParser: true });
   // database connection
    client.connect(err => {
    const collection = client.db("online-store").collection("items");
    collection.find({key}).toArray((err, documents) =>{
       if(err){
           console.log(err);
           res.status(500).send({message:err})
       }
       else{
        res.send(documents[0]);
       }
    });
    client.close();
});
// database connectioname});
})


app.post('/getProductByKey/:key', (req, res) => {
    const key = req.param.key;
    const itemkey = req.body;
    console.log(itemkey);
  
    client = new MongoClient(uri, { useNewUrlParser: true });
    // database connection
     client.connect(err => {
     const collection = client.db("online-store").collection("items");
     collection.find({key: {$in: itemkey}}).toArray((err, documents) =>{
        if(err){
            console.log(err);
            res.status(500).send({message:err})
        }
        else{
         res.send(documents);
        }
     });
     client.close();
 });
 // database connectioname});
 })

// Delete
// Update
// POST
app.post('/addProduct', (req, res) => {
    // save to database
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    // database connection
    client.connect(err => {
        const collection = client.db("online-store").collection("items");
        collection.insert(product, (err, result) =>{
           if(err){
               console.log(err);
               res.status(500).send({message:err})
           }
           else{
            res.send(result.ops[0]);
           }
        });
        client.close();
    });
    // database connection
})


app.post('/placeOrder', (req, res) => {
    // save to database
    const orderDetails = req.body;
    orderDetails.orderTime = new Date();
    console.log(orderDetails)

    client = new MongoClient(uri, { useNewUrlParser: true });
    // database connection
    client.connect(err => {
        const collection = client.db("online-store").collection("orders");
        collection.insertOne(orderDetails, (err, result) =>{
           if(err){
               console.log(err);
               res.status(500).send({message:err})
           }
           else{
            res.send(result.ops[0]);
           }
        });
        client.close();
    });
    // database connection
})

const port = process.env.PORT || 1200;
app.listen(port, () => console.log("Listenting to port 1200"))