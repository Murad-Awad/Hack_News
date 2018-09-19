/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */
var port = process.env.PORT || 8888;

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var redirect_uri = 'http://localhost:8888'; // Your redirect uri



var app = express();

app.use(express.static(__dirname + '/public'))




console.log('Listening on 8888');
app.listen(port, function() {});
