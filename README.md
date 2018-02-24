# Simple APM Agent

This is a node-js agent for the Simple APM. It is used to transfere important information of the clients to the master server. The agent will be integrated easily into an application with a web server as a middleware, if this feature is not needed, the system can also be used alone (by ignoring the middleware return) to get information about memory, disk, cpu.

## Features

* Memory usage of the system and the application
* CPU usage of the system and the application
* Disk usage of the whole system
* Run in an fork process => no blocking of main activities


## Getting Started

First install the agent to your project:

```
npm install --save simple-apm-agent
```

Now integrat in your application for example to __express__, but it on the highst position as possible:

```
/* ... */

// apm options with master information
const apmOptions = {
	appId: '<appId at master side>,
	appSecret: '<secret at master side>',
	host: 'localhost',
	port: 3000
};

// get the apm middle for express
const apm = require('simple-apm-agent')(apmOptions);

expressApp.use(apm);

/* ... */
```

## Options

* __ssl:__ Use TLS/SSL for the connection to the master
* __appId:__ Identifier for the master, each app should have an id
* __appId:__ Access secret for the master, each app need it
* __host:__ Master URL (Default: localhost)
* __port:__ Master Port (Default: 3000)
* __path:__ The Path of the master, where to send the data messages ((Default: /posts)
* __debug:__ Enable Debug to get some logs (Default: false)
* __stackUse:__ Enable stack of requests, so the system will collect all data first before send to the master (Default: false)
* __updateInterval:__ Update interval in ms if stack update is used (Default: 100000)
* __cpuLoad:__ Enable CPU load to track the CPU if possible (Default: true)
* __cpu:__ Setting of the CPU retrive
	* __updateInterval:__ Update interval of the CPU usage, means how often the CPU usage should be checked in ms (Default: 10000)
* __memoryLoad:__ Enable memory load to track the memory usage if possible (Default: true)
* __memory:__
	* __updateInterval:__ Update interval of the memory usage, means how often the memory usage should be checked in ms (Default: 10000)
},
* __diskUsage:__ Enable disk usage to track the disk volume if possible (Default: true)
* __disk:__
	* __updateInterval:__ Update interval of the disk usage, means how often the disk usage should be checked in ms (Default: 60000)

## License
(The MIT License)

Copyright (c) since 2016 Kristof Friess (Zebresel)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


Copyright (c) seit 2016 Kristof Friess (Zebresel)

Hiermit wird unentgeltlich jeder Person, die eine Kopie der Software und der zugehörigen Dokumentationen (die "Software") erhält, die Erlaubnis erteilt, sie uneingeschränkt zu nutzen, inklusive und ohne Ausnahme mit dem Recht, sie zu verwenden, zu kopieren, zu verändern, zusammenzufügen, zu veröffentlichen, zu verbreiten, zu unterlizenzieren und/oder zu verkaufen, und Personen, denen diese Software überlassen wird, diese Rechte zu verschaffen, unter den folgenden Bedingungen:

Der obige Urheberrechtsvermerk und dieser Erlaubnisvermerk sind in allen Kopien oder Teilkopien der Software beizulegen.

DIE SOFTWARE WIRD OHNE JEDE AUSDRÜCKLICHE ODER IMPLIZIERTE GARANTIE BEREITGESTELLT, EINSCHLIESSLICH DER GARANTIE ZUR BENUTZUNG FÜR DEN VORGESEHENEN ODER EINEM BESTIMMTEN ZWECK SOWIE JEGLICHER RECHTSVERLETZUNG, JEDOCH NICHT DARAUF BESCHRÄNKT. IN KEINEM FALL SIND DIE AUTOREN ODER COPYRIGHTINHABER FÜR JEGLICHEN SCHADEN ODER SONSTIGE ANSPRÜCHE HAFTBAR ZU MACHEN, OB INFOLGE DER ERFÜLLUNG EINES VERTRAGES, EINES DELIKTES ODER ANDERS IM ZUSAMMENHANG MIT DER SOFTWARE ODER SONSTIGER VERWENDUNG DER SOFTWARE ENTSTANDEN.