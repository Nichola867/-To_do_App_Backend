const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "todos"
});


//GET /tasks:
app.get("/tasks", function (request, response) {
  connection.query("SELECT * FROM Task", function (err, data) {
    if (err) {
      response.status(500).json({
        error: err
      });
    } else {
      response.status(200).json({
        todos: data
      });
    }
  })
})

//PUT
app.put("/tasks/:id", function (request, response) {

  const updatedTask = request.body
  const id = request.params.id;

  connection.query(`UPDATE Task SET ? WHERE id=?`, [updatedTask, id],
    function (err) {
      if (err) {
        response.status(500).json({
          error: err
        });
      } else {
        response.sendStatus(200);
      }
    }
  )
});



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

  response.status(200).json({
    message: `Received a request to delete task ID ${id}`
  })
})

module.exports.handler = serverlessHttp(app);



