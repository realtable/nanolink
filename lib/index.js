#!/usr/bin/env node
"use strict";

var _express = _interopRequireDefault(require("express"));

var _crypto = _interopRequireDefault(require("crypto"));

var _fs = _interopRequireDefault(require("fs"));

var _database = _interopRequireDefault(require("../database.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 3000;

var _short = function _short() {
  return _crypto["default"].randomBytes(4).toString('hex');
};

function reply(code, message, res) {
  res.status(code);
  res.set('Content-Type', 'text/plain');
  res.send(message);
}

app.get('/create/*', function (req, res) {
  var newID = _short();

  while (_database["default"][newID]) {
    newID = _short();
  }

  _database["default"][newID] = req.params[0];

  _fs["default"].writeFileSync('database.json', JSON.stringify(_database["default"]));

  var url = "".concat(req.protocol, "://").concat(req.get('host'), "/").concat(newID);
  reply(200, "200 Success: ".concat(url), res);
});
app.get('/:id', function (req, res) {
  var result = _database["default"][req.params.id];

  if (result) {
    res.redirect(result);
  } else {
    reply(404, '404 File Not Found', res);
  }
});
app.get('/', function (req, res) {
  var url = "".concat(req.protocol, "://").concat(req.get('host'));
  var message = "*** nanolink ***\nQuery ".concat(url, "/create/myURL to create a new link for 'myURL'.\nIf you find a bug, please report it at https://github.com/realtable/nanolink/issues.");
  reply(200, message, res);
});
app.listen(port, function () {
  return console.log("nanolink server listening on port ".concat(port));
});