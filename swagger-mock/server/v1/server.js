'use strict';

process.env.DEBUG = 'swagger:middleware';

var util = require('util');
var express = require('express');
var middleware = require('swagger-express-middleware');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var MemoryDataStore = middleware.MemoryDataStore,
  Resource = middleware.Resource;
var passwordHash = require('password-hash');

// auto-increment when adding new user in list
var idUser = 1;

// tab contains id of existing users
var userData = [];

//api url (user api)
const apiResources = '/api/users';

const http404 = {
  code: 44,
  message: "User not found."
}

middleware(path.join(__dirname, 'swaggerV1.yaml'), app, function (err, middleware) {
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/edit-www-form-urlencoded

  var myDB = new MemoryDataStore();

// get User collection from DataStore and refresh userData tab
  function getAllUsersFromDataStore() {
    myDB.getCollection(apiResources, function (err, resources) {
      userData = resources;
    });
    return userData;
  }

  function cryptPassword(req, res, next) {
    if (req.body.password == undefined) {
      res.status(400);
      next();
    } else {
      var hashedPassword = passwordHash.generate(req.body.password);
      return hashedPassword;
    }
  }

  function decryptPassword(plainPassword, hashedPassword) {
    return passwordHash.verify(plainPassword, hashedPassword);
  }

  app.get(apiResources, function (req, res, next) {
    userData = getAllUsersFromDataStore();
    if (userData.length == 0) {
      res.status(404);
      res.body = http404
    }
    next();
  });

  app.delete(apiResources + '/:id', function (req, res, next) {
    var exist = userData.findIndex(element => {
      return element == apiResources + '/' + req.params.id;
    });
    if (exist == -1) {
      res.status(404);
      res.body = http404;
    }
    else {
      res.body = {
        message: "The user has been deleted successfully."
      }
    }
    next();
    getAllUsersFromDataStore();
  });

  app.post(apiResources, function (req, res, next) {
    // req.body.password = cryptPassword(req, res, next);
    req.body.id = idUser++;
    next();
    getAllUsersFromDataStore();
  });

  app.put(apiResources + '/:id', function (req, res, next) {
    var exist = userData.findIndex(element => {
      return element == apiResources + '/' + req.params.id;
    });
    if (exist == -1) {
      res.status(404);
      res.send(http404);
    }
    else {
      // req.body.password = cryptPassword(req, res, next);
      next();
    }
  });

  app.get(apiResources + '/:id', function (req, res, next) {
    var exist = userData.findIndex(element => {
      return element == apiResources + '/' + req.params.id;
    });
    if (exist == -1) {
      res.status(404);
      res.send(http404);
    }
    else {
      next();
    }
  });

  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.validateRequest(),
    middleware.mock(myDB)
  );

  // Add a custom error handler that returns errors
  app.use(function (err, req, res, next) {

    if (err.status === 500) {
      res.status(err.status);
      res.type('json');
      res.send({
        code: 5,
        message: "Internal server error."
      });
    }

    if (err.status === 400) {
      res.status(err.status);
      res.type('json');
      res.send({
        code: 4,
        message: "Invalid input : " + err.message.substr(err.message.lastIndexOf("\n") + 1, err.message.length)
      });
    }
  });

  app.listen(8000, function () {
    console.log('The Swagger User is now running at http://localhost:8000');
  });
});
