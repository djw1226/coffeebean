'use strict';

var express = require('express')
var app = express();

app.get('/', function (req, res){

    var Config = require('config-js');
    var config = new Config('cb_config.js');

    var sql = require('mssql');
    var connStr = 'Server=' + config.get('database.server') + ';Initial Catalog=' + config.get('database.catalog') +
        '; Persist Security Info=False; User ID=' + config.get('database.userid') + ';Password=' + config.get('database.password') + '; MultipleActiveResultSet=False;Encrypt=True;TrustServerCertificate=False;';
    
    console.log(connStr);
    sql.connect(connStr, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();

        request.query('Select * from CoffeeListView', function (err, recordset) {
            if (err) console.log(err);

            res.send(recordset);

        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});

String.prototype.format = String.prototype.f = function () {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

