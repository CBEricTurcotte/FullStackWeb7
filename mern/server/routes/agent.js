import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(401).send("Unauthorized Request");

    let user = await db.collection("users").findOne({ email });

    if (!user) return res.status(404).send("User not found");

    if (user.password !== password)
      return res.status(400).send("Incorrect password");

    return res.status(200).send("Agent Found");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error adding agent");
  }
});
router.get("/error", (req, res) => {
  // Serve Error.jsx file from the correct path
  res.status(404).sendFile(path.join(__dirname, "../components/Error.jsx"));
});

router.get("/", async (req, res) => {
  let collection = await db.collection("agents");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

router.get("/:id", async (req, res) => {
  let collection = await db.collection("agents");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

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
