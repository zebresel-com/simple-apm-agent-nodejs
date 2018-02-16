// check user like to use SSL?
const https = require("https")
const http = require("http");

let updateStack = [];
let lastUpdate = Date.now();

// create function for the request, make it easier
module.exports = function(opts, data)
{
	if(opts.stackUse === true)
	{
		updateStack.push(data);
	}

	// check update needed?
	if((lastUpdate + opts.updateInterval) < Date.now() || opts.stackUse == false)
	{
		lastUpdate = Date.now();
		let newStack = updateStack.slice(0,updateStack.length);
		updateStack = [];
		// making the https get call
	    let protocol = opts.ssl === true ? https : http;
	    let request = protocol.request({
	    	host: opts.host,
	    	port: opts.port,
	    	path: opts.path,
	    	method: 'POST',
	    	headers: {
	    		'content-type':'application/json',
	    		'x-apm-app-secret' : opts.appSecret,
	    		'x-apm-app-id' : opts.appId
	    	}
	    }, function(response) {
	        response.on('data', function(data) {
	        	if(opts.debug === true)
	        	{
	        		console.log("[APM][Middleware] Response: ", data.toString());
	        	}
	        });
	    });

	    if(opts.debug === true)
	    {
	    	request.on('error', function(err){
		        console.log("[APM][Middleware] Error: ", err);
		    });

		    request.setTimeout(10000, function(err){
		        console.log("[APM][Middleware] Timeout after 10 second");
		    });
	    }
	 
	    //end the request
	    if(opts.stackUse === false)
	    {
	    	request.write(JSON.stringify(data));
	    }
	    else
	    {
	    	let posts = [];
	    	for (var i = 0; i < newStack.length; i++)
	    	{
	    		posts.push(newStack[i].post);
	    	}

	    	request.write(JSON.stringify({
	    		posts: posts
	    	}));
	    }
	    request.end();
	}
};