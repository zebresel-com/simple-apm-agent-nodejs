/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien              
 */

/*jshint esversion: 6 */
/*jshint node: true*/

const os = require('os');
const request = require('./request.js');
const pusage 	= require('pidusage')

class MemoryLoad
{
	constructor(opts)
	{
		this.opts = opts;
		this.updateInterval = this.opts.memory.updateInterval;
		this.interval = null;
	}

	start()
	{
		const self = this;
		this.interval = setInterval(function(){

			pusage.stat(self.opts.parentPid, function (err, stat) {

				request(self.opts, {
					post: {
					    type: 'memory',
					    startTime: Date.now(),
					    data: {
					    	free: os.freemem(),
					    	total: os.totalmem(),
					    	app: stat.memory,
					    	unit: 'bytes'
					    }
					}
				});

		    });
		},
		this.updateInterval);
	}

	stop()
	{
		clearInterval(this.interval);
	}
}

module.exports = MemoryLoad;