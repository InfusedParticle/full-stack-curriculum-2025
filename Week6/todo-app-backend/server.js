// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Creating an instance of Express
const app = express();

// Loading environment variables from a .env file into process.env
require("dotenv").config();

// Importing the Firestore database instance from firebase.js
const db = require("./firebase");

// Middlewares to handle cross-origin requests and to parse the body of incoming requests to JSON
app.use(cors());
app.use(bodyParser.json());

// Your API routes will go here...

// GET: Endpoint to retrieve all tasks
app.get("/tasks", async (req, res) => {
  try {
    // Fetching all documents from the "tasks" collection in Firestore
    const snapshot = await db.collection("todo").get();
    
    let tasks = [];
    // Looping through each document and collecting data
    snapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,  // Document ID from Firestore
        ...doc.data(),  // Document data
      });
    });
    
    // Sending a successful response with the tasks data
    res.status(200).send(tasks);
  } catch (error) {
    // Sending an error response in case of an exception
    res.status(500).send(error.message);
  }
});

// GET: Endpoint to retrieve all tasks for a user
// ... 
app.get("/tasks/:user", async (req, res) => {
  try {
    const user = req.params.user;
    const filtered = await db.collection("todo").where("user", "==", user).get();
    let tasks = [];
    filtered.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST: Endpoint to add a new task
// ...
app.post("/tasks", async (req, res) => {
  try {
    const newTask = {
      user: req.body.user,
      name: req.body.name,
      finished: req.body.finished
    }
    const taskRef = await db.collection("todo").add(newTask);

    res.status(200).json({
      id: taskRef.id,
      ...newTask
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE: Endpoint to remove a task
// ...
app.delete("/tasks/:id", async (req, res) => {
  try {
    const requestedId = req.params.id;
    const status = await db.collection("todo").doc(requestedId).delete();
    
    res.status(200).json({"message": "success!"});
  } catch(error) {
    res.status(500).send(error.message);
  }
});

// Setting the port for the server to listen on
const PORT = process.env.PORT || 3001;
// Starting the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});