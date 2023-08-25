const express = require("express");

const { MongoClient, ServerApiVersion } = require("mongodb");
const username = encodeURIComponent("hofrichter");
const password = encodeURIComponent("Z28CU6yeiQgVSsWL");
const clusterUrl = "testcluster.af80okp.mongodb.net";

const authMechanism = "DEFAULT";
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;

//Print all objects
async function listCollection(req, res) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    const database = client.db("mydb");
    const product = database.collection("mycollection");
    const objects = await product.find().toArray();
    res.status(200).json(objects);
  } catch (err) {
    console.error(err);
    if (err.name === "MongoNetworkError") {
      res.status(500).send({ message: "Database connection error" });
    } else if (err.name === "MongoError") {
      res.status(500).send({ message: "Database query error" });
    } else {
      res.status(500).send({ message: "Unknown server error" });
    }
  } finally {
    await client.close();
  }
}
// Update object
async function updateCollection(req, res) {
  const data = req.body;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    const database = client.db("mydb");
    const product = database.collection("mycollection");
    var myquery = { _id: data._id };
    var newvalues = { $set: data };
    result = await product.updateMany(myquery, newvalues);
    if (result["modifiedCount"] == 1) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (err) {
    console.error(err);
    if (err.name === "MongoNetworkError") {
      res.status(500).send({ message: "Database connection error" });
    } else if (err.name === "MongoError") {
      res.status(500).send({ message: "Database query error" });
    } else {
      res.status(500).send({ message: "Unknown server error" });
    }
  } finally {
    await client.close();
  }
}
// Add object
async function addElem(req, res) {
  const data = req.body;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    const database = client.db("mydb");
    const product = database.collection("mycollection");
    result = await product.insertOne(data);
    if (result["insertedId"] != null) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (err) {
    console.error(err);
    if (err.name === "MongoNetworkError") {
      res.status(500).send({ message: "Database connection error" });
    } else if (err.name === "MongoError") {
      res.status(500).send({ message: "Database query error" });
    } else {
      res.status(500).send({ message: "Unknown server error" });
    }
  } finally {
    await client.close();
  }
}
// Delete object
async function deleteElem(req, res) {
  const data = req.body;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    const database = client.db("mydb");
    const elem = database.collection("mycollection");
    result = await elem.deleteOne(data);
    if (result["deletedCount"] == 1) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (err) {
    console.error(err);
    if (err.name === "MongoNetworkError") {
      res.status(500).send({ message: "Database connection error" });
    } else if (err.name === "MongoError") {
      res.status(500).send({ message: "Database query error" });
    } else {
      res.status(500).send({ message: "Unknown server error" });
    }
  } finally {
    await client.close();
  }
}

module.exports = { listCollection, updateCollection, addElem, deleteElem };
