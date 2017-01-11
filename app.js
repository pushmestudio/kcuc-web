/* eslint-disable no-console */

const express = require('express');
const request = require('request-promise'); // Promiseのリクエストを扱う
const config = require('config'); // configディレクトリに置いた設定ファイルを読み込む
const cfenv = require('cfenv'); // Bluemixで環境変数を取得する
const bodyParser = require('body-parser'); // POSTのFormを取り扱う

const app = express();
const appEnv = cfenv.getAppEnv(); // localではlocalhost:8080がデフォルト, 空いてなければ:6001

const apiProtocol = config.get('api.protocol');
const apiHost = config.get('api.host');
const apiPort = config.get('api.port');
const apiTarget = config.get('api.target');
const debugMode = config.get('debug');
const target = apiProtocol + '://' + apiHost + ':' + apiPort + apiTarget;

app.use('/', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api', (req, res) => {
  // reqでとれるプロパティは以下を参照 http://expressjs.com/en/api.html
  let reqPath = req.path;
  let reqMethod = req.method;

  if (reqMethod === 'GET') {
    request.get({url: target + reqPath, qs: req.query}).then((result) => {
      res.type('application/json');
      res.send(result);
    }).catch(() => {
      console.log('error is occurred on ' + target + reqPath);
      res.type('application/json');
      res.send({});
    });
  } else if (reqMethod === 'POST') {
    request.post({url: target + reqPath, form: req.body}).then((result) => {
      res.type('application/json');
      res.send(result);
    }).catch(() => {
      console.log('error is occurred on ' + target + reqPath);
      res.type('application/json');
      res.send({});
    });
  } else {
    res.type('application/json');
    res.send({});
  }
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  console.log('api request target is ' + target);
  console.log('debug mode is ' + debugMode);
  console.log('server starting on ' + appEnv.url);
});
