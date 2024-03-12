import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /agent.
const router = express.Router();

// This section will handle the login request
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Here you can implement your authentication logic.
    // For simplicity, let's assume we have a collection named "users" in our database.
    const collection = db.collection("users");
    const user = await collection.findOne({ email, password });

    if (user) {
      // If authentication is successful, you can send a success response.
      res.status(200).json({ message: "Login successful" });
    } else {
      // If authentication fails, you can send an error response.
      res.status(401).json({ message: "Login failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during login" });
  }
});

// This section will help you get a list of all the agents.
router.get("/", async (req, res) => {
  let collection = await db.collection("agents");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single agent by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("agents");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new agent.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      rating: req.body.rating,
      fee: req.body.fee,
      region: req.body.region,
    };
    let collection = await db.collection("agents");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding agent");
  }
});

// This section will help you update a agent by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        rating: req.body.rating,
        fee: req.body.fee,
        region: req.body.region,
      },
    };

    let collection = await db.collection("agents");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating agent");
  }
});

// This section will help you delete a agent
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("agents");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting agent");
  }
});

export default router;
