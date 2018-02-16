/**
 * @autor       Kristof Friess
 * @company     Zebresel
 * @copyright   Since 2018 by Zebresel - Deine Agentur für digitale Medien              
 */

/*jshint esversion: 6 */
/*jshint node: true*/

const request = require('./request.js');
const CPULoad = require('./cpu.js');
const MemoryLoad = require('./memory.js');

function main(opts)
{
	let cpu = null;
	// user wants track CPU?
	if(opts.cpuLoad === true)
	{
		cpu = new CPULoad(opts);
		cpu.start();
	}

	let mem = null;
	// user wants track CPU?
	if(opts.memoryLoad === true)
	{
		mem = new MemoryLoad(opts);
		mem.start();
	}
}

let args = process.argv;
let options = JSON.parse(args[2])

process.on('message', function(msg) {
	// parent send message to send it to the apm-dashboard
	request(options, msg);
});


main(options);