/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien              
 */

/*jshint esversion: 6 */
/*jshint node: true*/

var apm = require('./../index.js')({
    ssl: false,
	appId: 'example',
	appSecret: 'example',
	host: 'localhost',
	port: 3000,
	path: '/posts',
	debug: true,
	type: 'http'  
});


// Add this to the VERY top of the first file loaded in your app
var app = require('express')()
app.use(apm);

app.get('/', function (req, res) {
  	for (var i = 10000 - 1; i >= 0; i--)
  	{
		console.log(i);
	}

	res.send('Hello World!');
});

app.listen(3200)