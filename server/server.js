var bodyParser = require("body-parser");
const express = require("express");
const app = express();

const { MongoClient, ServerApiVersion } = require("mongodb");
const username = encodeURIComponent("hofrichter");
const password = encodeURIComponent("Z28CU6yeiQgVSsWL");
const clusterUrl = "testcluster.af80okp.mongodb.net";

const authMechanism = "DEFAULT";
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;

//Print all objects
async function listCollection(res) {
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
    //const objects = await product.find({}, {projection: {_id: 0}}).sort({latdec: 1}).toArray();
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
// async function updateCollection(res) {
//   const client = new MongoClient(uri);
//   try {
//     const database = client.db("mydb");
//     const product = database.collection("mycollection");
//     var myquery = { name: "Udelat kolac" };
//     var newvalues = { $set: { until_date: Date() } };

//     await product.updateMany(myquery, newvalues);
//     res.send("Dates changed");
//   } catch (err) {
//     res.send(err);
//   } finally {
//     await client.close();
//   }
// }
// Add object
async function addElem(res, res_body) {
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
    const new_obj = res_body;
    result = await product.insertOne(new_obj);
    res.status(200).send(result);
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
async function deleteElem(res, body_res) {
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
    const obj = body_res;
    result = await elem.deleteOne(obj);
    if (result["deletedCount"] == 1) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "Data not found" });
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

app.use(bodyParser.json());

app.get("/api/ListTasks", (req, res) => {
  listCollection(res);
});
// app.put('/api/Updatedata', (req, res) => {
//     updateCollection(res);
// });
app.post("/api/AddTask", (req, res) => {
  addElem(res, req.body);
});
app.delete("/api/DeleteTask", (req, res) => {
  deleteElem(res, req.body);
});

app.listen(5000, () => console.log("App available on http://localhost:5000"));
