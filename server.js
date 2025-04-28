const express = require("express");

const app = express();

const users = {};

app.get("/", (req, res) => {
  let usersList = Object.keys(users).map((ukey) => users[ukey]) || [];
  res.send(usersList);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  
  const user = users[id];
  if (!user) {
    res.send(); //not fund
  } else {
    res.send(user);
  }
});
app.post("/", (req, res) => {
  const newUser = req.body;
  if (!newUser.name) {
    //bad request
  }
  if (!newUser.email) {
        //bad request
  }

  let userId = getRandomInt(1, 1000000)
  users[userId] = { id: userId, name: newUser.name, email: newUser.email };
  req.send(users[userId]);
});

app.put("/", (req, res) => {
    const userUpdate = req.body;

    if (!userUpdate.id) { 
        // bad request
    }

    if (!Number.isInteger(userUpdate.id)) { 
        // bad request
    }


    if (!userUpdate.name) {
      //bad request
    }
    if (!userUpdate.email) {
          //bad request
    }

    if(!users[userUpdate.id]) {
        //not found
    }

    users[userUpdate.id].email = userUpdate.email;
    users[userUpdate.id].name = userUpdate.name;

    req.send(users[userUpdate.id]) //updated




});

app.delete("/:id", (req, res) => {

    const { id } = req.params;
    if (!id) {
        res.status = 400
        res.send("missing id")
        //bad request
    }

    if(!users[id]) {
        res.status = 404
        res.send("user not found")
    }
    delete users[id]


    res.send(200);
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

app.listen(3000);
