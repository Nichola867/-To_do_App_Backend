const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());


//GET /tasks:
app.get("/tasks", function (request, response) {
  response.send({
    tasks: [
      {
        date_added: "2020-01-09",
        task: "water plants",
        task_complete: true,
        id: 1
      }
    ]
  });
});

//PUT

app.put("/tasks/:id", function (request, response) {

  const updatedTask = request.body
  const id = request.params.id;

  response.status(200).json ({
    message: `Successfully updated task ID ${id} with date added: ${updatedTask.date_added}, task: ${updatedTask.task}, task_complete: ${updatedTask.task_complete}`
  })
})

//POST /tasks:
app.post("/tasks", function (request, response) {
  const task = request.body.task;
  const date_added = request.body.date_added;
  const task_complete = request.body.task_complete;

  response.status(200).json({
    message: `Received a request to add date added ${date_added} with task ${task}, task_complete ${task_complete}`
  });
});


//DELETE
app.delete("/tasks/:id", function (request, response) {
  const id = request.params.id;
  const task = request.body.task;
  const date_added = request.body.date_added;
  const task_complete = request.body.task_complete;

  response.status(200).json({
    message: `Received a request to delete task ID ${id} with date added: ${date_added}, task: ${task}, task_complete: ${task_complete}`
  })
})

module.exports.handler = serverless(app);



