var fs = require('fs');
var path = require('path');
var jsYaml = require('js-yaml');
var request = require('request');
var unzip = require('unzip2');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var codeGenEndpoint = 'http://generator.swagger.io/api/gen/clients';
var swaggerFile = './server/V3/swaggerV3.yaml';

var availableLanguage = [
  "akka-scala", "android", "async-scala", "bash", "clojure", "cpprest", "csharp", "CsharpDotNet2", "cwiki",
  "dart", "dynamic-html", "elixir", "flash", "go", "groovy", "html", "html2", "java", "javascript",
  "javascript-closure-angular", "jaxrs-cxf-client", "jmeter", "objc", "perl", "php", "python", "qt5cpp", "ruby",
  "scala", "swagger", "swagger-yaml", "swift", "swift3", "tizen", "typescript-angular", "typescript-angular2",
  "typescript-fetch", "typescript-node"
]
var language = 'typescript-angular2';
// module.exports =language;
console.log("Generating " + language + " ...");


//**************************** To use directly backend contract decomment this code*******************************************
// swaggerFile = './server/swagger.json';
// var request = require('request');
// request('http://192.168.1.176:8085/web/swagger.json', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response level code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
//   fs.writeFile(swaggerFile, body); // write backend contract into ./server/swagger.json
// });
//*****************************************************************************************************************************


fs.readFile(path.resolve(swaggerFile), 'utf8', function (error, yaml) {
  if (error) {
    throw error;
  }

  var swaggerObj = jsYaml.load(yaml);

  var postBody = {
    spec: swaggerObj,
    options: {
      modelPropertyNaming: 'camelCase',
      apiPackage: 'api.clients.settings',
      modelPackage: 'api.clients.settings'
    }
  };

  request.post({
    url: codeGenEndpoint + '/' + language,
    body: JSON.stringify(postBody),
    headers: {
      'Content-Type': 'application/json'
    }
  }, function (error, response, body) {
    if (error) {
      throw error;
    }

    if (response.statusCode !== 200) {
      throw new Error('Response code was not 200. ' + body)
    }

    var responseObj = JSON.parse(body);

    request({
      url: responseObj.link,
      encoding: null
    }).pipe(unzip.Extract({path: 'clientApi-' + language}));
  });
});
