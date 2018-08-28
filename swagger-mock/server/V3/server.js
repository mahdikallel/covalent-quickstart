'use strict';

process.env.DEBUG = 'swagger:middleware';
var bodyParser = require('body-parser');
var util = require('util');
var express = require('express');
var middleware = require('swagger-express-middleware');
var path = require('path');
var fs = require('fs');
const fileUpload = require('express-fileupload');
var app = express();

var basePath = 'http://localhost:8000';
var MemoryDataStore = middleware.MemoryDataStore,
  Resource = middleware.Resource;
// var jwt = require('jsonwebtoken');

var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');

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

//api url (widget-notification api)
const apiWidgetsNotifications = '/api/widgetsnotifications';

// tab contains id of existing widgets-users
var widgetsNotificationData = [];

// auto-increment when adding new user in list
var idWidget = 1;

//api url (logs api)
const apiLogs = '/api/logs';

var allLogs = [];

//api url (notifications api)
const apiNotifications = '/api/notifications';

var allNotifications = [];

//api url (current logs api)

const apiCurrentLogs = '/api/currentLogLevel';

var allLogsLevel = [];

var nbrLogToCreateFile = 500;

const apiOauth = '/api/oauth';

app.use(fileUpload());

//api url (widget-user api)
const apiWidgetsMonitoring = '/api/widgetsmonitoring';

// tab contains id of existing widgets-users
var widgetsMonitoringData = [];

// api activities (Traceability)

var idActivity = 1;

const apiActivities = '/api/activities';

var allActivities = [];

var allActivitiesData = [];

var nbrActivitiesToCreateFile = 300;

var idMessage = 1;

const apiMesssage = '/contact';

var allMessage = [];

middleware(path.join(__dirname, 'swaggerV3.yaml'), app, function (err, middleware) {
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


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
      if (idToSearch == 0) {
        return -1;
      } else {
        return element == api + '/' + idToSearch;
      }
    });
    return exist;
  }

  /* Upload Picture */
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(express.static(__dirname + '/uploads/Profile-Pictures'));

  app.post('/api/upload', function (req, res, next) {
    if (!req.files)
      return res.status(400).send('No files were uploaded.');

    let sampleFile = req.files.photo;
    fs.readdirSync('./uploads/Profile-Pictures').forEach(file => {
      let fichier1 = file.substr(0, file.indexOf('.'));
      let fichier2 = sampleFile.name.substr(0, file.indexOf('.'));
      if (fichier1 === fichier2) {
        fs.unlink('./uploads/Profile-Pictures/' + file);
      }
    })
    sampleFile.mv('./uploads/Profile-Pictures/' + sampleFile.name, function (err) {
      if (err)
        return res.status(500).send(err);

      res.send('File uploaded!');
    });
    next();
  });

  /* Customize response Users API*/

// get User collection from DataStore and refresh userData tab
  function getAllUsersFromDataStore() {
    myDB.getCollection(apiUsers, function (err, resources) {
      userData = resources;
    });
    return userData;
  }

// use body parser so we can get info from POST and/or URL parameters
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.post(apiOauth, function (req, res, next) {
    userData = getAllUsersFromDataStore();
    for (var i = 0; i < userData.length; i++) {
      if ((req.body.email == userData[i].data.email) && (req.body.password == userData[i].data.password)) {
        var token = 'xdj03984jkdnsdkjdsd912893iujkfbsndd2983u93hejkns,adnsakj';
        res.send({
          success: true,
          message: 'Enjoy your token!',
          token: token
        })
      }
    }
    next();
  });

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
    if ((exist == -1) && (req.params.id != 0)) {
      res.status(404);
      res.body = returnHttp404("Id User ");
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


  /* Customize Notifications */
  function getAllNotificationsFromDataStore() {
    myDB.getCollection(apiNotifications, function (err, resources) {
      allNotifications = resources;
    });
    return allNotifications;
  }

  app.get(apiNotifications, function (req, res, next) {
    allNotifications = getAllNotificationsFromDataStore();
    if (allNotifications.length === 0) {
      res.status(200);
      res.body = returnHttp404("Notifications");
    }
    next();
  });

  var idNotifications = 1;

  app.post(apiNotifications, function (req, res, next) {
    req.body.id = idNotifications++;
    next();
    getAllNotificationsFromDataStore();
  });

  app.delete(apiNotifications + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(allNotifications, apiNotifications, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.body = returnHttp404("Authority");
    }
    else {
      res.body = {
        message: "Notification has been deleted successfully."
      }
    }
    next();
    getAllPermissionsDataFromDataStore();
  });

  app.put(apiNotifications + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(allNotifications, apiNotifications, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("notifications"));
    }
    else {
      next();
    }
  });

  app.get(apiNotifications + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(userData, apiUsers, req.params.id);
    var user = getAllUsersFromDataStore();
    var notif = getAllNotificationsFromDataStore();
    var all = [];
    if ((exist == -1) && (req.params.id != 0)) {
      res.status(404);
      res.body = returnHttp404("Id User ");
    } else {
      for (var i = 0; i < user.length; i++) {
        for (var j = 0; j < notif.length; j++)
          if ((notif[j].data.id_user == user[i].data.id) && (notif[j].data.id_user == req.params.id)) {
            all.push(notif[j].data);
          }
      }
      res.status(200);
      res.body = all[all.length - 1];
      next();
    }
    next();
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
        let age = new Date().getFullYear() - new Date(userData[i].data.dateOfBirth).getFullYear();
        if (!isNaN(age)) {
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
      res.body = [];
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

  /* Customize response Widgets-Notification API*/


  function getAllWidgetsNotificationDataFromDataStore() {
    myDB.getCollection(apiWidgetsNotifications, function (err, resources) {
      widgetsNotificationData = resources;
    });
    return widgetsNotificationData;
  }

  app.get(apiWidgetsNotifications, function (req, res, next) {
    widgetsNotificationData = getAllWidgetsNotificationDataFromDataStore();
    if (widgetsNotificationData.length == 0) {
      res.status(200);
      res.body = [];
    }
    next();
  });

  app.post(apiWidgetsNotifications, function (req, res, next) {
    req.body.id = (idWidget++).toString();
    next();
    getAllWidgetsNotificationDataFromDataStore();
  });

  app.get(apiWidgetsNotifications + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(widgetsNotificationData, apiWidgetsNotifications, req.params.id);
    if (exist == -1) {
      res.status(200);
      res.body = [];
    }
    next();

  });

  app.put(apiWidgetsNotifications + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(widgetsNotificationData, apiWidgetsNotifications, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("widget-notification"));
    }
    next();

  });

  app.delete(apiWidgetsNotifications + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(widgetsNotificationData, apiWidgetsNotifications, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.body = returnHttp404("Widget-notification");
    }
    else {
      res.body = {
        message: "The widget-notification has been deleted successfully."
      }
    }
    next();
    getAllWidgetsNotificationDataFromDataStore();
  });


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
      res.body = [];
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
    var exist = findRessouresInCollection(allLogsLevel, apiCurrentLogs, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("Log level"));
    }
    else {
      next();
    }
  });


  /* Customize response  Activities API*/

  function saveActivitiesInFile() {
    myDB.getCollection(apiActivities, function (err, resources) {
      if (typeof resources[0] != 'undefined') {
        allActivitiesData = [];
        for (let i = 0; i < resources.length; i++) {
          allActivitiesData.push(resources[i].data);
        }

        if (allActivitiesData.length > nbrActivitiesToCreateFile) {
          fs.writeFile("../traceability/traceability" + getCurrentDateAndTime() + ".json", JSON.stringify(allActivitiesData), function (err) {
            if (err) {
              return console.log(err);
            }

            console.log("The file was saved!");
          });
          myDB.deleteCollection(apiActivities);
        }
      }
    });
  }

  function getAllActivitesFromDataStore() {
    myDB.getCollection(apiActivities, function (err, resources) {
      allActivities = resources;
    });
    return allActivities;
  }

  app.get(apiActivities, function (req, res, next) {
    allActivities = getAllActivitesFromDataStore();
    if (allActivities.length == 0) {
      res.status(200);
      res.body = [];
    }
    next();
  });

  app.post(apiActivities, function (req, res, next) {
    req.body.id = idActivity++;
    next();
    getAllActivitesFromDataStore();
    saveActivitiesInFile();
  });


  // traceability
  // to get activity by id
  app.get(apiActivities + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(allActivities, apiActivities, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("Activity "));
    }
    else {
      next();
    }
  });

  // traceability
  // to get all activities for a specific user
  app.get(apiActivities + '/user/:userId', function (req, res, next) {

    var activitiesOfUser = [];
    var exist = 0;
    for (let i = 0; i < allActivities.length; i++) {
      if (allActivities[i].data.userId == req.params.userId) {
        exist = 1;
        activitiesOfUser.push(JSON.parse(JSON.stringify(allActivities[i].data)));
      }

    }
    if (exist == 0) {
      res.status(404);
      res.send(returnHttp404("Activity "));
    }
    else {
      res.status(200);
      res.send(activitiesOfUser);
    }
  });

  // traceability
  // to get all activities for a specific Entity (USER,ROLE,AUTHORITY)
  app.get(apiActivities + '/objects/:objectName', function (req, res, next) {
    var actionOnObject = [];
    var exist = 0;
    for (let i = 0; i < allActivities.length; i++) {
      if (allActivities[i].data.objectName == req.params.objectName) {
        exist = 1;
        actionOnObject.push(JSON.parse(JSON.stringify(allActivities[i].data)));
      }

    }
    if (exist == 0) {
      res.status(404);
      res.send(returnHttp404("Activity "));
    }
    else {
      res.status(200);
      res.send(actionOnObject);
    }
  });

  // to get  activities for a specific action (CREATE,DELETE,UPDATE,SIGNIN,SIGOUT,AFFECT)
  app.get(apiActivities + '/action/:actionName', function (req, res, next) {
    var activitiesOnObject = [];
    var exist = 0;
    for (let i = 0; i < allActivities.length; i++) {
      if (allActivities[i].data.action == req.params.actionName) {
        exist = 1;
        activitiesOnObject.push(JSON.parse(JSON.stringify(allActivities[i].data)));
      }

    }
    if (exist == 0) {
      res.status(404);
      res.send(returnHttp404("Activity "));
    }
    else {
      res.status(200);
      res.send(activitiesOnObject);
    }
  });


  /* Customize response NumberOfUsersWithGENDER API*/

  app.get('/api/usersconnexion', function (req, res, next) {
      var users_in = [];
      var users_out = [];

      allActivities = getAllActivitesFromDataStore();

      for (var i = 0; i < allActivities.length; i++) {
        if (allActivities[i].data.action == 'SIGNIN') {
          if (users_in.length == 0) {
            users_in.push(allActivities[i].data);
          } else {
            var b = true;
            for (var j = 0; j < users_in.length; j++) {
              if (users_in[j].userId == allActivities[i].data.userId) {
                users_in[j] = allActivities[i].data;
                b = false;
                break;
              }
            }
            if (b) {
              users_in.push(allActivities[i].data);
            }
          }
        }
        if (allActivities[i].data.action == 'SIGNOUT') {
          if (users_out.length == 0) {
            users_out.push(allActivities[i].data);
          } else {
            var b = true;
            for (var j = 0; j < users_out.length; j++) {
              if (users_out[j].userId == allActivities[i].data.userId) {
                users_out[j] = allActivities[i].data;
                b = false;
                break;
              }
            }
            if (b) {
              users_out.push(allActivities[i].data);
            }
          }
        }
      }

      var time;
      for (var i = 0; i < users_in.length; i++) {
        for (var k = 0; k < users_out.length; k++) {
          if (users_in[i].userId == users_out[k].userId) {
            if (users_in[i].time > users_out[k].time) {
              users_out.splice(k, 1);
            } else {
              users_in.splice(i, 1);
            }
          }

        }
      }
      var user_on = new Array();
      var user_off = new Array();
      var users = getAllUsersFromDataStore();

      for (var i = 0; i < users_in.length; i++) {
        for (var j = 0; j < users.length; j++) {
          if ((users[j].data.id == users_in[i].userId) && (users_in[i] != null)) {
            user_on[i] = users[j].data.lastname + ' ' + users[j].data.firstname;
          }
        }
      }


      for (var i = 0; i < users_out.length; i++) {
        for (var j = 0; j < users.length; j++) {
          if ((users[j].data.id == users_out[i].userId) && (users_out[i] != null)) {
            user_off[i] = users[j].data.lastname + ' ' + users[j].data.firstname;
          }
        }
      }


      res.status(200);
      res.body = {'usersOn': user_on, 'usersOff': user_off};
      next();

    }
  );

  /* Widget Monitoring Users Connexion*/

  function getAllWidgetsMonitoringDataFromDataStore() {
    myDB.getCollection(apiWidgetsMonitoring, function (err, resources) {
      widgetsMonitoringData = resources;
    });
    return widgetsMonitoringData;
  }

  app.get(apiWidgetsMonitoring, function (req, res, next) {
    widgetsMonitoringData = getAllWidgetsMonitoringDataFromDataStore();
    if (widgetsMonitoringData.length == 0) {
      res.status(200);
      res.body = [];
    }
    next();
  });

  app.post(apiWidgetsMonitoring, function (req, res, next) {
    req.body.id = (idWidget++).toString();
    next();
    getAllWidgetsMonitoringDataFromDataStore();
  });

  app.get(apiWidgetsMonitoring + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(widgetsMonitoringData, apiWidgetsMonitoring, req.params.id);
    if (exist == -1) {
      res.status(200);
      res.body = [];
    }
    else {
      next();
    }
  });

  app.put(apiWidgetsMonitoring + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(widgetsMonitoringData, apiWidgetsMonitoring, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("widget-monitoring"));
    }
    else {
      next();
    }
  });

  app.delete(apiWidgetsMonitoring + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(widgetsMonitoringData, apiWidgetsMonitoring, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.body = returnHttp404("Widget-monitoring");
    }
    else {
      res.body = {
        message: "The widget-monitoring has been deleted successfully."
      }
    }
    next();
    getAllWidgetsMonitoringDataFromDataStore();
  });
  /*Customize message Contact*/
  function getAllMessagesContact() {
    myDB.getCollection(apiMesssage, function (err, resources) {
      allMessage = resources;
    });
    return allMessage;
  }

  app.get(apiMesssage, function (req, res, next) {
    allMessage = getAllMessagesContact();
    if (allMessage.length === 0) {
      res.status(200);
      res.body = [];
    }
    next();
  });

  app.get(apiMesssage + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(allMessage, apiMesssage, req.params.id);
    if ((exist == -1) && (req.params.id != 0)) {
      res.status(404);
      res.body = returnHttp404("Id Message ");
    }
    next();
  });

  app.put(apiMesssage + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(allMessage, apiMesssage, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.send(returnHttp404("Id Message"));
    }
    else {
      next();
    }
  });

  app.delete(apiMesssage + '/:id', function (req, res, next) {
    var exist = findRessouresInCollection(allMessage, apiMesssage, req.params.id);
    if (exist == -1) {
      res.status(404);
      res.body = returnHttp404("Message");
    }
    else {
      res.body = {
        message: "The Message has been deleted successfully."
      }
    }
    next();
    getAllMessagesContact();
  });

  app.post(apiMesssage, function (req, res, next) {
    req.body.id = idMessage++;
    next();
    getAllMessagesContact();
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

  function affectRole() {
    var request = require('request');
    var options = {
      uri: basePath + apiPermission,
      method: 'GET'

    };
    request(options, function (error, response, body) {
      var jsonObject = JSON.parse(body);
      var tabRoles = [
        {designation: "ROLE_SUPER_ADMIN", description: "Role:Super Administrator", authorities: jsonObject}]
      var options2 = {
        uri: basePath + apiRoles,
        method: 'POST',
        json: tabRoles[0]
      };
      request(options2, function (error, response, body) {
        var options = {
          uri: basePath + apiRoles,
          method: 'GET'
        };
        request(options, function (error, response, body) {
          var jsonObject = JSON.parse(body);
          var tabUsers = [
            {
              username: "mahdi", firstname: "kallel",
              lastname: "mahdi", password: "12345",
              email: "mahdi.kallel.stg@sifast.com", dateOfBirth: "10/04/1992",
              gender: "male", phone: "21104577",
              roles: jsonObject
            },
            {
              username: "ahmed", firstname: "HadjTaieb",
              lastname: "Ahmed", password: "12345",
              email: "ahmed.hadjtaieb.stg@sifast.com", dateOfBirth: "02/10/1992",
              gender: "male", phone: "98555666",
              roles: jsonObject
            }
          ]

          initAppWithData(tabUsers[0], basePath + apiUsers);
          initAppWithData(tabUsers[1], basePath + apiUsers);

        });
      });
    });
  }


  function postData() {

    // Log Levels
    var tabLogLevels = [{id: 0, logLevel: "OFF", current: 0},
      {id: 1, logLevel: "ERROR", current: 0},
      {id: 2, logLevel: "WARN", current: 1},
      {id: 3, logLevel: "INFO", current: 0},
      {id: 4, logLevel: "DEBUG", current: 0},
      {id: 5, logLevel: "LOG", current: 0}]
    for (let i = 0; i < tabLogLevels.length; i++) {
      initAppWithData(tabLogLevels[i], basePath + apiCurrentLogs);
    }

    // ROLES
    var tabRoles = [
      {designation: "ROLE_ADMIN", description: "Role: Administrator", authorities: []},
      {designation: "ROLE_GUEST", description: "Role: Private user", authorities: []}
    ]

    for (let i = 0; i < tabRoles.length; i++) {
      initAppWithData(tabRoles[i], basePath + apiRoles);
    }

    // Authorities
    var tabAuthorities = [
      {designation: "AUTH_USER_CREATE", description: "You have permission to create a user"},
      {designation: "AUTH_USER_DELETE", description: "You have permission to delete a user"},
      {designation: "AUTH_USER_UPDATE", description: "You have permission to update a user"},
      {designation: "AUTH_USER_READ", description: "You have permission to show list of users"},
      {designation: "AUTH_ROLE_CREATE", description: "You have permission to create a role"},
      {designation: "AUTH_ROLE_READ", description: "You have permission to access to role list"},
      {designation: "AUTH_ROLE_UPDATE", description: "You have permission to update a role "},
      {designation: "AUTH_ROLE_DELETE", description: "You have permission to delete a role"},
      {designation: "AUTH_TRACEABILITY_READ", description: "You have permission to consult traceabilities"},
      {designation: "AUTH_GENERATE_REPORT_EXEC", description: "You have permission to generate PDF and CSV format"},
      {designation: "AUTH_ROLE_AFFECT", description: "You have permission to affect a role"},
      {designation: "AUTH_PERM_AFFECT", description: "You have permission to affect a permission"},
      {designation: "AUTH_PERM_READ", description: "You have permission to consult list of permissions"},
      {designation: "AUTH_LOG_READ", description: "You have permission to consult list of permissions"}
    ]

    for (let i = 0; i < tabAuthorities.length; i++) {
      initAppWithData(tabAuthorities[i], basePath + apiPermission);
    }


  }

  function initAppWithData(data, urlApi) {
    var request = require('request');

    var options = {
      uri: urlApi,
      method: 'POST',
      json: data

    };
    request(options, function (error, response, body) {
    });

  }

  app.listen(8000, function () {
    console.log('The Swagger User is now running at http://localhost:8000');
    // post data when server is launched
    postData();
    affectRole();
  });

});
