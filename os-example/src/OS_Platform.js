import React from 'react';
import os from 'os';

export default function OSarch() {
  return (
    <div className="OS_Arch">
        <p>
	  Platform: {os.platform()}
        </p>
    </div>
  );
}
