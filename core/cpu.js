/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien              
 */

/*jshint esversion: 6 */
/*jshint node: true*/

const os 		= require('os');
const request 	= require('./request.js');
const pusage 	= require('pidusage')

class CPULoad
{
	constructor(opts)
	{
		this.opts = opts;
		this.updateInterval = this.opts.cpu.updateInterval;
		this.interval = null;
	}

	start()
	{
		const self = this;
		this.interval = setInterval(function(){

			let start = self.average();

			setTimeout(function(){

				let end = self.average();
				// let core = null;

				let usage = {
					// core: [],
					usage: 0.0
				};

				// usage of each core
				// for(let index in end.core)
				// { 
				// 	usage.core[index] = (1 - ((end.core[index].idle - start.core[index].idle) / (end.core[index].total - start.core[index].total) )) * 100;
				// }

				usage.cores = Object.keys(end.core).length;
				usage.usage = (100 - ((end.idle - start.idle) / (end.total - start.total) ) * 100) * usage.cores;

				pusage.stat(self.opts.parentPid, function (err, stat) {

					usage.appUsage = stat.cpu;

					request(self.opts, {
						post: {
						    type: 'cpu',
						    startTime: Date.now(),
						    data: usage
						}
					});

			    });

			}, 500);
		},
		this.updateInterval);
	}

	average()
	{
		let cpu, cpus, idle, len, total, totalIdle, totalTick, type, result, coreTick;

		totalIdle = 0;
		totalTick = 0;
		cpus = os.cpus();

		result = {
			core : {

			},
			idle: 0.0,
			total: 0.0
		}

		for (let i = cpus.length - 1; i >= 0; i--)
		{
			cpu = cpus[i];
			coreTick = 0;

			for (type in cpu.times)
			{
				totalTick += cpu.times[type];
				coreTick += cpu.times[type];
			}
			totalIdle += cpu.times.idle;

			result.core[i] = {
				total: coreTick,
				idle: cpu.times.idle
			};
		}

		result.idle = totalIdle;
		result.total = totalTick;
		
		return result;
	}

	stop()
	{
		clearInterval(this.interval);
	}
}

module.exports = CPULoad;