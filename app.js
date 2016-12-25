const express = require('express');
const request = require('request-promise');
const config = require('config');
const app = express();

const target = config.get('api.protocol') + '://' + config.get('api.host') + ':' + config.get('api.port') + '/kcuc/rest-v1';

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

app.listen(config.get('client.port'), () => {
  console.log('api request target is ' + target);
  console.log('debug mode is ' + config.get('debug'));
  console.log('now listening on the port ' + config.get('client.port'));
});
