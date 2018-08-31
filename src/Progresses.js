import React from 'react';
import { STATUSES } from './connectionrunner';

const Progresses = (props) => {
	return (
    <section className="progress">
      <h2>Progress:</h2>

      {
        props.cnxns.sort((a,b) => a.status - b.status)
          .map((cnxn, i) => {
          return (
            <div className="bar-container" key={i}>
              <div className="bar" style={{
                width: `${cnxn.progress}%`
              }}></div>
              <span className="id">{cnxn.id}</span>
              <span className="percent">{cnxn.progress}%</span>
              <span className="status">{STATUSES[cnxn.status]}</span>
            </div>
          )
        })  
      }
    </section>
  )
}

export default Progresses;