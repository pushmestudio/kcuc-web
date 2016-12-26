/* eslint-disable no-console */

const express = require('express');
const request = require('request-promise');
const config = require('config');
const cfenv = require('cfenv');

const app = express();
const appEnv = cfenv.getAppEnv(); // localではlocalhost:8080がデフォルト

const apiProtocol = config.get('api.protocol');
const apiHost = config.get('api.host');
const apiPort = config.get('api.port');
const debugMode = config.get('debug');
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
    console.error('something goes wrong');
  });
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  console.log('api request target is ' + target);
  console.log('debug mode is ' + debugMode);
  console.log('server starting on ' + appEnv.url);
});
