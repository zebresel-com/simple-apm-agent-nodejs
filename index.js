/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien              
 */

/*jshint esversion: 6 */
/*jshint node: true*/

const request = require('./core/request.js');
const CPULoad = require('./core/cpu.js');
const MemoryLoad = require('./core/memory.js');

const { fork } = require('child_process');

let forked = null;


module.exports = function(opts)
{
	const defaultOpts = {
		ssl: true,
		appId: null,
		appSecret: null,
		host: 'localhost',
		port: 3000,
		path: '/posts',
		debug: false,
		cpuLoad: true,
		stackUse: false,
		updateInterval: 100000, // 1mins
		cpu: {
			updateInterval: 10000 // 10 second
		},
		memoryLoad: true,
		memory: {
			updateInterval: 10000 // 10 second
		},
		diskUsage: true,
		disk: {
			updateInterval: 60000 // 60 second
		},
	};

	opts = Object.assign(defaultOpts, opts) || defaultOpts;

	opts.parentPid = process.pid;

	let optsString = JSON.stringify(opts);

	function startFork()
	{
		forked = fork(__dirname + '/core/fork.js', [
			optsString
		]);

		forked.on('close', function(code, signal){
			
			process.nextTick(function(){
				startFork();
			});
		});
		
		// forked.on('exit', function(code, signal){
		// 	console.log('Exit: ', code, signal);
		// });

		// forked.on('error', function(err){
		// 	console.log('Error: ', err);
		// });

	}

	startFork();

	return function(req, res, next){

		const start = Date.now();
	    // The 'finish' event will emit once the response is done sending
	    res.once('finish', function()
	    {
	    	const end = Date.now();
	    	try
	    	{
	    		forked.send({
		    		post: {
				        type: 'http',
				        startTime: start,
				        endTime: end,
				        data: {
				        	duration: (end-start),
				        	dunit: 'ms',
				        	method: req.method,
				        	statusCode: req.statusCode,
				        	path: req.originalUrl
				        }
				    }
		    	});
	    	}
	    	catch(err)
	    	{
	    		console.error(err);
	    	}
	    });

	    next();
	}
};