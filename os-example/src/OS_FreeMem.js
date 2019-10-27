import React from 'react';
import os from 'os';

function humanFileSize(size) {
	    var i = Math.floor( Math.log(size) / Math.log(1024) );
	    return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

export default function OSfreemem() {
  return (
    <div className="OS_Arch">
        <p>
	  Free Memory: {humanFileSize(os.freemem())}
        </p>
        <p>
	  Total Memory: {humanFileSize(os.totalmem())}
        </p>
        <p>
	  Usage: {Math.floor(os.freemem() / os.totalmem() * 100 )} %
        </p>
    </div>
  );
}
