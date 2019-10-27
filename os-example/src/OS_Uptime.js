import React from 'react';
import os from 'os';
//https://stackoverflow.com/questions/28705009/how-do-i-get-the-server-uptime-in-node-js
String.prototype.toHHMMSS = function () {
	    var sec_num = parseInt(this, 10); // don't forget the second param
	    var hours   = Math.floor(sec_num / 3600);
	    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	    var seconds = sec_num - (hours * 3600) - (minutes * 60);

	    if (hours   < 10) {hours   = "0"+hours;}
	    if (minutes < 10) {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}
	    var time    = hours+':'+minutes+':'+seconds;
	    return time;
	}

export default function OSuptime() {
  return (
    <div className="OS_Arch">
        <p>
	  Uptime: {(os.uptime() + "").toHHMMSS()}
        </p>
    </div>
  );
}
