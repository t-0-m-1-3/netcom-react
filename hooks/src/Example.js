import React, {useState} from 'react';

export default function Example(){
	//declare a new state variable to count things
 const [count, setCount] = useState(0);
 return (
	 <div>
	 <p> You clicked this button {count} times </p>
	 <button onClick={() => setCount(count  + 1 )}>
	 	Click Me or Something
	 </button>
	 </div>
 );
}
