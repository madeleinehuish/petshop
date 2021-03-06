'use strict';

/* eslint no-console: 0 */

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');
const user = {
  name: 'admin',
  pass: 'meowmix'
};

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());
app.use((req, res, next) => {
  const user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm="Required"');

    return res.send(401);
  }
  next();
});
app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);

      return res.sendStatus(500);
    }
    const pets = JSON.parse(petsJSON);

    res.send(pets);
  });
});
app.get('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.error(err.stack);

      return res.sendStatus(500);
    }
    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    res.set('Content-Type', 'application/json');
    res.send(pets[id]);
  });
});
app.post('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      console.error(readErr.stack);

      return res.sendStatus(500);
    }
    const pets = JSON.parse(petsJSON);
    const name = req.body.name;
    const age = parseInt(req.body.age);
    const kind = req.body.kind;
    const pet = { age, kind, name };

    if (!name || !age || !kind) {
      console.error('Bad Request');

      return res.sendStatus(400);
    }
    if (!pet) {
      return res.sendStatus(400);
    }
    pets.push(pet);
    const newpetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newpetsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);

        return res.sendStatus(500);
      }
      res.set('Content-Type', 'application/json');
      res.send(pet);
    });
  });
});
app.put('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      console.error(readErr.stack);

      return res.sendStatus(500);
    }
    const pets = JSON.parse(petsJSON);
    const name = req.body.name;
    const age = parseInt(req.body.age);
    const kind = req.body.kind;
    const pet = { age, kind, name };
    const id = parseInt(req.params.id);

    if (!name || !age || !kind) {
      console.error('Bad Request');

      return res.sendStatus(400);
    }
    if (!pet) {
      return res.sendStatus(400);
    }
    pets[id] = pet;
    const newpetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newpetsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);

        return res.sendStatus(500);
      }
      res.set('Content-Type', 'application/json');
      res.send(pet);
    });
  });
});
app.patch('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      console.error(readErr.stack);

      return res.sendStatus(500);
    }
    const pets = JSON.parse(petsJSON);
    const name = req.body.name;
    const age = parseInt(req.body.age);
    const kind = req.body.kind;
    const id = parseInt(req.params.id);
    const pet = pets[id];

    console.log(name, age, kind);
    if (name) {
      pet.name = name;
    }
    if (age) {
      pet.age = age;
    }
    if (kind) {
      pet.kind = kind;
    }
    if (!name && !age && !kind) {
      console.error('Bad Request');

      return res.sendStatus(400);
    }
    if (!pet) {
      return res.sendStatus(400);
    }
    pets[id] = pet;
    const newpetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newpetsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);

        return res.sendStatus(500);
      }
      res.set('Content-Type', 'application/json');
      res.send(pet);
    });
  });
});
app.delete('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (readErr, petsJSON) => {
    if (readErr) {
      console.error(readErr.stack);

      return res.sendStatus(500);
    }
    const id = Number.parseInt(req.params.id);
    const pets = JSON.parse(petsJSON);

    if (id < 0 || id >= pets.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }
    const pet = pets.splice(id, 1)[0];
    const newpetsJSON = JSON.stringify(pets);

    fs.writeFile(petsPath, newpetsJSON, (writeErr) => {
      if (writeErr) {
        console.error(writeErr.stack);

        return res.sendStatus(500);
      }
      res.set('Content-Type', 'application/json');
      res.send(pet);
    });
  });
});
app.use((req, res) => {
  res.sendStatus(404);
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
module.exports = app;
