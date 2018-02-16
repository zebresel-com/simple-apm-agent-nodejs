/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien              
 */

/*jshint esversion: 6 */
/*jshint node: true*/

const os = require('os');
const request = require('./request.js');
const diskusage = require('diskusage')

class DiskUsage
{
	constructor(opts)
	{
		this.opts = opts;
		this.updateInterval = this.opts.disk.updateInterval;
		this.interval = null;
	}

	start()
	{
		const self = this;
		this.interval = setInterval(function(){

			let path = os.platform() === 'win32' ? 'c:' : '/';
 
			diskusage.check(path, function(err, info) {
			    if (err)
			    {
			        console.log(err);
			    }
			    else
			    {
			    	request(self.opts, {
						post: {
						    type: 'disk',
						    startTime: Date.now(),
						    data: {
						    	available: info.available,
						    	total: info.total,
						    	free: info.free,
						    	unit: 'bytes'
						    }
						}
					});
			    }
			});
		},
		this.updateInterval);
	}

	stop()
	{
		clearInterval(this.interval);
	}
}

module.exports = DiskUsage;