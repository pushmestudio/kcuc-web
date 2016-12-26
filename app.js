/* eslint-disable no-console */

const express = require('express');
const request = require('request-promise');
const app = express();

require('dotenv').config({silent: true}); // もしなかったとしてもエラーを出さない
const apiProtocol = process.env.API_PROTOCOL;
const apiHost = process.env.API_HOST;
const apiPort = process.env.API_PORT;
const clientPort = process.env.VCAP_APP_PORT || process.env.CLIENT_PORT || 3000;
const debugMode = process.env.DEBUG;

const target = apiProtocol + '://' + apiHost + ':' + apiPort + '/kcuc/rest-v1';

app.use('/kcuc', express.static('public'));

app.use('/kcuc/api', (req, res) => {
  // reqでとれるプロパティは以下を参照 http://expressjs.com/en/api.html
  console.log(req.path);
  let path = req.path;
  console.log(req.query);
  console.log(req.method);
  // TODO postリクエストが来た場合のpost対処, 現在はgetしか処理できない

  request({url: target + path, qs: req.query}).then((result) => {
    res.type('application/json');
    res.send(result);
  }).catch(() => {
    console.log('something goes wrong');
  });
});

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log('server starting on ' + appEnv.url);
});
