import React from 'react';
import os from 'os';

export default function OShostname() {
  return (
    <div className="OS_Arch">
        <p>
	  Hostname: {os.hostname()}
        </p>
    </div>
  );
}
