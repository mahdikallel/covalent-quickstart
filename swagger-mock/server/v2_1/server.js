'use strict';

process.env.DEBUG = 'swagger:middleware';

var util = require('util');
var express = require('express');
var middleware = require('swagger-express-middleware');
var path = require('path');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var MemoryDataStore = middleware.MemoryDataStore,
  Resource = middleware.Resource;
var passwordHash = require('password-hash');

// auto-increment when adding new user in list
var idUser = 1;

// tab contains id of existing users
var userData = [];

// tab contains id of existing permissions
var permissionData = [];

// tab contains id of existing roles
var roleData = [];

//api url (user api)
const apiUsers = '/api/users';

//api url (permission api)
const apiPermission = '/api/authorities';


//api url (permission api)
const apiRoles = '/api/roles';

//api url (permission api)
const apiLogs = '/api/logs';

var allLogs = [];

// const http404 = {
//   code: 44,
//   message: "User not found."
// }

middleware(path.join(__dirname, 'swaggerV2_1.yaml'), app, function (err, middleware) {
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/edit-www-form-urlencoded

  var myDB = new MemoryDataStore();


  function returnHttp404(ressourceName) {
    var http404 = {
      code: 44,
      message: ressourceName + " not found."
    }
    return http404;
  }

  function findRessouresInCollection(collectionTabName, api, idToSearch) {
    var exist = collectionTabName.findIndex(element => {
      return element == api + '/' + idToSearch;
    });
    return exist;
  }

  /* Customize response Users API*/

// get User collection from DataStore and refresh userData tab
  function getAllUsersFromDataStore() {
    myDB.getCollection(apiUsers, function (err, resources) {
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

  app.get(apiUsers, function (req, res, next) {
    userData = getAllUsersFromDataStore();
    if (userData.length == 0) {
      res.status(404);
      res.body = returnHttp404("User");
    }
    next();
  });

  app.delete(apiUsers + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(userData, apiUsers, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.body = returnHttp404("User");
    }
    else {
      res.body = {
        message: "The user has been deleted successfully."
      }
    }
    next();
    getAllUsersFromDataStore();
  });

  app.post(apiUsers, function (req, res, next) {
    // req.body.password = cryptPassword(req, res, next);
    req.body.id = idUser++;
    next();
    getAllUsersFromDataStore();
  });

  app.put(apiUsers + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(userData, apiUsers, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("User"));
    }
    else {
      // req.body.password = cryptPassword(req, res, next);
      next();
    }
  });

  app.get(apiUsers + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(userData, apiUsers, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("User"));
    }
    else {
      next();
    }
  });


  /* Customize response Permissions API*/

// get Permissions collection from DataStore and refresh permissionData tab
  function getAllPermissionsDataFromDataStore() {
    myDB.getCollection(apiPermission, function (err, resources) {
      permissionData = resources;
    });
    return permissionData;
  }

  app.get(apiPermission, function (req, res, next) {
    permissionData = getAllPermissionsDataFromDataStore();
    if (permissionData.length == 0) {
      res.status(404);
      res.body = returnHttp404("Authority");
    }
    next();
  });

  app.delete(apiPermission + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(permissionData, apiPermission, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.body = returnHttp404("Authority");
    }
    else {
      res.body = {
        message: "Authority has been deleted successfully."
      }
    }
    next();
    getAllPermissionsDataFromDataStore();
  });

  app.post(apiPermission, function (req, res, next) {
    // req.body.password = cryptPassword(req, res, next);
    req.body.id = idUser++;
    next();
    getAllPermissionsDataFromDataStore();
  });

  app.put(apiPermission + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(permissionData, apiPermission, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("Authority"));
    }
    else {
      // req.body.password = cryptPassword(req, res, next);
      next();
    }
  });

  app.get(apiPermission + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(permissionData, apiPermission, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("Authority"));
    }
    else {
      next();
    }
  });


  /* Customize response Role API*/

// get role collection from DataStore and refresh permissionData tab
  function getAllRoleDataFromDataStore() {
    myDB.getCollection(apiRoles, function (err, resources) {
      roleData = resources;
    });
    return roleData;
  }

  app.get(apiRoles, function (req, res, next) {
    roleData = getAllRoleDataFromDataStore();
    if (roleData.length == 0) {
      res.status(404);
      res.body = returnHttp404("Role");
    }
    next();
  });

  app.delete(apiRoles + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(roleData, apiRoles, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.body = returnHttp404("Role");
    }
    else {
      res.body = {
        message: "The Role has been deleted successfully."
      }
    }
    next();
    getAllRoleDataFromDataStore();
  });

  app.post(apiRoles, function (req, res, next) {
    // req.body.password = cryptPassword(req, res, next);
    req.body.id = idUser++;
    next();
    getAllRoleDataFromDataStore();
  });

  app.put(apiRoles + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(roleData, apiRoles, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("Role"));
    }
    else {
      // req.body.password = cryptPassword(req, res, next);
      next();
    }
  });

  app.get(apiRoles + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(roleData, apiRoles, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("Role"));
    }
    else {
      next();
    }
  });


  /* Customize response Log API*/

  function getCurrentDateAndTime() {
    var currentDate = new Date();
    var fullTime = currentDate.getDate() + '-'
      + (currentDate.getMonth() + 1) + '-'
      + currentDate.getFullYear() + 'T'
      + currentDate.getHours() + '-'
      + currentDate.getMinutes() + '-'
      + currentDate.getSeconds() + '-'
      + currentDate.getMilliseconds();
    return fullTime;
  }

  function saveLogInFile() {
    myDB.getCollection(apiLogs, function (err, resources) {
      if (typeof resources[0] != 'undefined') {
        allLogs = [];
        for (let i = 0; i < resources.length; i++) {
          allLogs.push(resources[i].data);
        }

        if (allLogs.length > 50) {
          fs.writeFile("../logs/log" + getCurrentDateAndTime() + ".json", JSON.stringify(allLogs), function (err) {
            if (err) {
              return console.log(err);
            }

            console.log("The file was saved!");
          });
          myDB.deleteCollection(apiLogs);
        }
      }
    });
  }

  app.get(apiLogs, function (req, res, next) {
    myDB.getCollection(apiLogs, function (err, resources) {
      if (resources.length == 0) {
        res.status(404);
        res.body = returnHttp404("Log");
      }
    });
    next();
  });

  app.post(apiLogs, function (req, res, next) {
    next();
    saveLogInFile();
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
