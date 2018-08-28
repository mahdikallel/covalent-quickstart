'use strict';

process.env.DEBUG = 'swagger:middleware';

var util = require('util');
var express = require('express');
var middleware = require('swagger-express-middleware');
var path = require('path');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var basePath = require('../../../src/app/services/clients/basePath');
var MemoryDataStore = middleware.MemoryDataStore,
  Resource = middleware.Resource;
var passwordHash = require('password-hash');

// auto-increment when adding new user in list
var idUser = 1;

// tab contains id of existing users
var userData = [];

// tab contains id of existing permissions
var permissionData = [];

// tab contains id of existing permissions
var roleData = [];

//api url (user api)
const apiUsers = '/api/users';

//api url (permission api)
const apiPermission = '/api/authorities';

//api url (permission api)
const apiRoles = '/api/roles';

//api url (widget-user api)
const apiWidgetsUsers = '/api/widgetsusers';

// tab contains id of existing widgets-users
var widgetsUsersData = [];

//api url (widget-user api)
const apiWidgetsProfil = '/api/widgetsprofil';

// tab contains id of existing widgets-users
var widgetsProfilData = [];

// auto-increment when adding new user in list
var idWidget = 1;

//api url (logs api)
const apiLogs = '/api/logs';

var allLogs = [];

//api url (current logs api)

const apiCurrentLogs = '/api/currentLogLevel';

var allLogsLevel = [];

var logLevelUrl = basePath.urlPath+'/api/currentLogLevel';

var nbrLogToCreateFile = 500;

middleware(path.join(__dirname, 'swaggerV2_2.yaml'), app, function (err, middleware) {
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
      if (idToSearch == 0){
        return -1;
      }else {
        return element == api + '/' + idToSearch;
      }
    });
    return exist;
  }

  /* Customize response Users API*/

// get User collection from DataStore and refresh userData tab
  function getAllUsersFromDataStore() {
    myDB.getCollection(apiUsers, function (err, resources) {
      userData = resources;
      console.log(resources);
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
    if (userData.length === 0) {
      res.status(200);
      res.body = returnHttp404("Users");
    }
      next();
  });

  app.get(apiUsers + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(userData, apiUsers, req.params.id);
    if ((exist == -1) && (req.params.id !=0) ) {
      res.status(404);
      res.body=returnHttp404("Id User ");
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


  /* Customize response NumberOfUsers API*/

  app.get('/api/numberofusers', function (req, res, next) {
    userData = getAllUsersFromDataStore();
    console.log(userData);
    res.status(200);
    res.body = userData.length.toString();
    next();
  });

  /* Customize response NumberOfUsersWithGENDER API*/

  app.get('/api/numberofuserswithgender', function (req, res, next) {
    var men = 0;
    var women = 0;
    userData = getAllUsersFromDataStore();
    if (userData.length != 0) {
      for (var i = 0; i < userData.length; i++) {
        if (userData[i].data.gender == 'male') {
          men++;
        } else {
          women++;
        }
      }
      res.status(200);
      res.body = {'male': men.toString(), 'female': women.toString()};
      next();

    } else {
      res.status(404);
      res.body = returnHttp404("numberofuserswithgender");
      next();
    }
    next();
  });

  /* Customize response NumberOfUsersWithRole API*/

  app.get('/api/numberofuserswithage', function (req, res, next) {
    var tab = [];
    userData = getAllUsersFromDataStore();
    if (userData.length != 0) {
      for (var i = 0; i < userData.length; i++) {
        let age=new Date().getFullYear() - new Date(userData[i].data.dateOfBirth).getFullYear();
        if (! isNaN(age)){
          tab.push(age);
        }

      }
      var result = tab.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
      res.status(200);
      res.body = {'age': Object.keys(result), 'count ': Object.keys(result).map(key => result[key])};
      next();

    } else {
      res.status(404);
      res.body = returnHttp404("numberofuserswithage");
      next();
    }
  });

  /* Customize response NumberOfUsersWithRole API*/

  app.get('/api/numberofuserswithrole', function (req, res, next) {
    var tab = [];
    userData = getAllUsersFromDataStore();
    if (userData.length != 0) {
      for (var i = 0; i < userData.length; i++) {
        for (var j = 0; j < userData[i].data.roles.length; j++) {
          tab.push(userData[i].data.roles[j].designation);
        }
      }
      console.log(tab)
      var result = tab.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
      res.status(200);
      res.body = {'roles': Object.keys(result), 'count ': Object.keys(result).map(key => result[key])};
      next();
    } else {
      res.status(404);
      res.body = returnHttp404("numberOfUsersWithRole");
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

  // app.get(apiRoles + '/:roleDesignation', function (req, res, next) {
  //   console.log("req.params.roleDesignation" + req.params.roleDesignation);
  //   var exist = findRessouresInCollection(roleData, apiRoles, req.params.roleDesignation);
  //   if (exist == -1) {
  //     res.status(404);
  //     res.send(returnHttp404("Role"));
  //   }
  //   else {
  //     next();
  //   }
  // });


  /* Customize response Widgets-Users API*/


  function getAllWidgetsUsersDataFromDataStore() {
    myDB.getCollection(apiWidgetsUsers, function (err, resources) {
      widgetsUsersData = resources;
    });
    return widgetsUsersData;
  }

  app.get(apiWidgetsUsers, function (req, res, next) {
    widgetsUsersData = getAllWidgetsUsersDataFromDataStore();
    if (widgetsUsersData.length == 0) {
      res.status(200);
      res.body = [];
    }
    next();
  });

  app.post(apiWidgetsUsers, function (req, res, next) {
    req.body.id = (idWidget++).toString();
    next();
    getAllWidgetsUsersDataFromDataStore();
  });

  app.get(apiWidgetsUsers + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(widgetsUsersData, apiWidgetsUsers, req.params.id);
    if (exist == -1) {
      res.status(200);
      res.body=[];
    }
    else {
      next();
    }
  });

  app.put(apiWidgetsUsers + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(widgetsUsersData, apiWidgetsUsers, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("widget-users"));
    }
    else {
      next();
    }
  });


  app.delete(apiWidgetsUsers + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(widgetsUsersData, apiWidgetsUsers, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.body = returnHttp404("Widget-users");
    }
    else {
      res.body = {
        message: "The widget-users has been deleted successfully."
      }
    }
    next();
    getAllWidgetsUsersDataFromDataStore();
  });

  /* Customize response Widgets-Profil API*/


  function getAllWidgetsProfilDataFromDataStore() {
    myDB.getCollection(apiWidgetsProfil, function (err, resources) {
      widgetsProfilData = resources;
    });
    return widgetsProfilData;
  }

  app.get(apiWidgetsProfil, function (req, res, next) {
    widgetsProfilData = getAllWidgetsProfilDataFromDataStore();
    if (widgetsProfilData.length == 0) {
      res.status(200);
      res.body = [];
    }
    next();
  });

  app.post(apiWidgetsProfil, function (req, res, next) {
    req.body.id = (idWidget++).toString();
    next();
    getAllWidgetsProfilDataFromDataStore();
  });

  app.get(apiWidgetsProfil + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(widgetsProfilData, apiWidgetsProfil, req.params.id);
    if (exist == -1) {
      res.status(200);
      res.body=[];
    }
    else {
      next();
    }
  });

  app.put(apiWidgetsProfil + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(widgetsProfilData, apiWidgetsProfil, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("widget-profil"));
    }
    else {
      next();
    }
  });

  app.delete(apiWidgetsProfil + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(widgetsProfilData, apiWidgetsProfil, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.body = returnHttp404("Widget-profil");
    }
    else {
      res.body = {
        message: "The widget-profil has been deleted successfully."
      }
    }
    next();
    getAllWidgetsProfilDataFromDataStore();
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

        if (allLogs.length > nbrLogToCreateFile) {
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
    console.log('IP adr -------');
    console.log(req.connection.remoteAddress);
    next();
    saveLogInFile();
  });


  /* Customize response  Log Level API*/

  function getAllLogLevelFromDataStore() {
    myDB.getCollection(apiCurrentLogs, function (err, resources) {
      allLogsLevel = resources;
    });
    return allLogsLevel;
  }

  app.get(apiCurrentLogs, function (req, res, next) {
    allLogsLevel = getAllLogLevelFromDataStore();
    if (allLogsLevel.length == 0) {
      res.status(404);
      res.body = returnHttp404("Log level");
    }
    next();
  });

  app.post(apiCurrentLogs, function (req, res, next) {
    next();
    getAllLogLevelFromDataStore();
  });

  app.put(apiCurrentLogs + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(allLogsLevel, apiCurrentLogs, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("Log level"));
    }
    else {
      next();
    }
  });

  app.get(apiCurrentLogs + '/:id', function (req, res, next) {
    console.log('allLogsLevel');
    console.log(allLogsLevel);
    var exist = findRessouresInCollection(allLogsLevel, apiCurrentLogs, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("Log level"));
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

  function postLogLevel() {
    var request = require('request');
    var tab = {id: 0, logLevel: "OFF", current: 0}

    var tabLogLevels = [{id: 0, logLevel: "OFF", current: 0},
      {id: 1, logLevel: "ERROR", current: 0},
      {id: 2, logLevel: "WARN", current: 1},
      {id: 3, logLevel: "INFO", current: 0},
      {id: 4, logLevel: "DEBUG", current: 0},
      {id: 5, logLevel: "LOG", current: 0}]

    for (let i = 0; i < tabLogLevels.length; i++) {
      var options = {
        uri: logLevelUrl,
        method: 'POST',
        json: tabLogLevels[i]

      };
      request(options, function (error, response, body) {
        // console.log(tabLogLevels[i]);
      });
    }
  }

  app.listen(8000, function () {
    console.log('The Swagger User is now running at http://localhost:8000');
    postLogLevel();
  });


});
