/* eslint-disable no-console */

const express = require('express');
const request = require('request-promise');
const app = express();

require('dotenv').config({silent: true}); // もしなかったとしてもエラーを出さない
const apiProtocol = process.env.API_PROTOCOL;
const apiHost = process.env.API_HOST;
const apiPort = process.env.API_PORT;
const clientPort = process.env.CLIENT_PORT;
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

app.listen(clientPort, () => {
  console.log('api request target is ' + target);
  console.log('debug mode is ' + debugMode);
  console.log('now listening on the port ' + clientPort);
});
