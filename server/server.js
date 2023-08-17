var bodyParser = require('body-parser')
const express = require('express');
const app = express()


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://hofrichter:Z28CU6yeiQgVSsWL@testcluster.af80okp.mongodb.net/?retryWrites=true&w=majority";

//Print all objects
async function listCollection(res) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('mydb');
    const product = database.collection("mycollection");

    //const objects = await product.find({}, {projection: {_id: 0}}).sort({latdec: 1}).toArray();
    const objects = await product.find().toArray();
    res.json(objects)
  } catch (err) {
    res.send(err);
  } finally {
    await client.close();
  }
}
// Update object
async function updateCollection(res) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('mydb');
    const product = database.collection("mycollection");
    var myquery = { name: "Udelat kolac" };
    var newvalues = { $set: {until_date: Date()} };

    await product.updateMany(myquery, newvalues)
    res.send("Dates changed")
  } catch (err) {
    res.send(err)
  } finally {
    await client.close();
  }
}
// Create object
async function createCollection(res, res_body) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('mydb');
    const product = database.collection("mycollection");
    var new_obj = res_body;
    objects = await product.insertOne(new_obj)
    res.send("New object added");
  } catch (err) {
    res.send(err);
  } finally {
    await client.close();
  }
}

async function deleteCollection(res) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('mydb');
    const product = database.collection("mycollection");

    await product.deleteOne()
    res.send("Object deleted");
  } catch (err) {
    res.send(err);
  } finally {
    await client.close();
  }
}

app.use(bodyParser.json())

app.get('/api', (req, res) => {
  listCollection(res);
   
});
app.put('/api/Updatedata', (req, res) => {
    updateCollection(res);
});
app.post('/api/AddData', (req, res) => {
    createCollection(res, req.body);
});
app.delete('/api/DeleteData', (req, res) => {
    deleteCollection(res);
});

app.listen(5000, () => console.log('App available on http://localhost:5000'))