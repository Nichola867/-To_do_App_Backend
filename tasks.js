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


//GET /tasks - working:
app.get("/todos", function (request, response) {
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
  });
});

//PUT
app.put("/todos/:id", function (request, response) {

  const updatedTask = request.body
  const taskId = request.params.id;

  connection.query(`UPDATE Task SET ? WHERE taskId=?`, [updatedTask, taskId],
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



//POST /tasks - working
app.post("/todos", function (request, response) {
  const newTask = request.body

  connection.query("INSERT INTO Task SET ?", [newTask], function (err, data) {
    if (err) {
      response.status(500).json({
        error: err
      });
    } else {
      newTask.id = data.insertId;
      response.status(201).json(newTask);
    }
  });
});





//DELETE - working
app.delete("/todos/:id", function (request, response) {
  const taskId = request.params.id;

  connection.query("DELETE FROM Task WHERE taskId = ?", [taskId], function (err) {
    if (err) {
      response.status(500).json({
        error: err
      });
    } else {
      response.sendStatus(200)
    }
  })
})



module.exports.handler = serverlessHttp(app);



