import React, { Fragment } from 'react';

const Buttons = (props) => {
	const { btnEnabled, done, start, reset } = props;
	return (
		<section className="buttons"> 
      {
        (btnEnabled) ? 
          <button onClick={start}>Start</button>
          :
          (done) ? 
            <Fragment>
            	<button className="disabled" disabled>Done</button>
            	<button onClick={reset}>Reset</button>
            </Fragment>
            :
            <button className="disabled" disabled>Running...</button>
      }
    </section>
	);
}

export default Buttons;