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
		type: 'http',
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
	};

	// TODO: Use a child_process for all stuff like upload and watching

	opts = Object.assign(defaultOpts, opts) || defaultOpts;

	opts.parentPid = process.pid;

	const forked = fork(__dirname + '/core/fork.js', [
		JSON.stringify(opts)
	]);

	return function(req, res, next){

		const start = Date.now();
	    // The 'finish' event will emit once the response is done sending
	    res.once('finish', function()
	    {
	    	const end = Date.now();

	    	forked.send({
	    		post: {
			        type: opts.type,
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
	    });

	    next();
	}
};