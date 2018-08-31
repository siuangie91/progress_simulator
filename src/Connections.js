import React from 'react';
import { STATUSES } from './connectionrunner';

const Connections = (props) => {
	return (
    <section className="connections">
      <h2>Connections:</h2>
      {
        Object.keys(props.count).map((key, i) => {
          return (
            <p key={i}>
              <strong>{STATUSES[key]}:</strong> {props.count[key]}
            </p>
          );
        })
      }
    </section>  
  )
}

export default Connections;