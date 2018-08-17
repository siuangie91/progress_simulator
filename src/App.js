///////////
/* YOU DO NOT NEED TO CHANGE ANYTHING BETWEEN LINE 1 and LINE 40  */
//////////

import React, { Component, Fragment } from 'react';
import './App.css';

const STATUSES = ['disconnected', 'loading', 'connecting', 'importing', 'finishing', 'connected']

function connect() {
  let progress = 0
  let status = STATUSES[0]

  let i = 0
  return function(callback) {
    (function loop(next, progress) {
      var rand = Math.round(Math.random() * 1000) + 500;
      setTimeout(function() {
        if (STATUSES[next]) {
          callback({
            progress: progress.toFixed(2),
            status: STATUSES[next]
          });
          loop(next + 1, progress * 1 + (1 / (STATUSES.length - 1)));
        } else {
          return
        }
      }, rand);
    }(i, progress))
  }
};

const run = connect();

const connections = [
  { id: 1, run },
  { id: 2, run },
  { id: 3, run },
  { id: 4, run },
  { id: 5, run }
];

//////////
/* YOU DO NOT NEED TO CHANGE ANYTHING ABOVE THIS LINE */
//////////

class App extends Component {
  constructor() {
    super();

    this.state = {
      count: this.initCount(),
      cnxns: this.initCnxns(),
      btnEnabled: true, 
      done: false
    };
  }

  initCount = () => {
    const count = STATUSES.map(status => {
      if(status === STATUSES[0]) {
        return connections.length;
      }
      else {
        return 0;
      }
    });

    return count;
  }

  initCnxns = () => {
    const cnxCollection = connections.map(connection => {
      return {
        id: connection.id,
        progress: 0,
        status: 0
      }
    });

    return cnxCollection;
  }

  updateBars = (id, item, callback) => {
    const { progress, status } = item;
    
    const newCnxns = this.state.cnxns;
    const thisNewCnxn = newCnxns.find(cnxn => cnxn.id === id);
    thisNewCnxn.progress = parseFloat(progress) * 100;
    thisNewCnxn.status = STATUSES.indexOf(status);

    this.setState({
      cnxns: newCnxns
    }, callback);
  }

  updateCount = () => {
    const newCounts = new Array(STATUSES.length).fill(0); // space cost too high? 
    const updatedCnxns = this.state.cnxns;

    // get counts using state.cnxns
    updatedCnxns.forEach(cnxn => {
      const cnxnStatus = cnxn.status;

      newCounts[cnxnStatus]++;
    });

    this.setState({
      count: newCounts
    }, this.checkDone);
  }

  checkDone = () => {
    if(this.state.count[STATUSES.length - 1] === connections.length) {
      this.setState({
        done: true
      });
    }
  }

  start = () => {
    this.setState({
      btnEnabled: false
    })

    connections.forEach(connection => {
      connection.run((item) => {
        this.updateBars(connection.id, item, this.updateCount);
      });
    })
  }

  reset = () => {
    this.setState({
      count: this.initCount(),
      cnxns: this.initCnxns(),
      btnEnabled: true, 
      done: false
    });
  }

  render() {
    return ( 
      <Fragment>
        <section className="buttons">
          {
            (this.state.btnEnabled) ? 
              <button onClick={this.start}>Start</button>
              :
              (this.state.done) ? 
                <button className="disabled" disabled>Done</button>
                :
                <button className="disabled" disabled>Running...</button>
          }
          {
            (this.state.done) ? 
              <button onClick={this.reset}>Reset</button>
              : ""
          } 
        </section>

        <section className="connections">
          <h2>Connections:</h2>
          {
            Object.keys(this.state.count).map((key, i) => {
              return (
                <p key={i}>
                  <strong>{STATUSES[key]}:</strong> {this.state.count[key]}
                </p>
              );
            })
          }
        </section>     

        <section className="progress">
          <h2>Progress:</h2>

          {
            this.state.cnxns.sort((a,b) => a.status - b.status)
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
      </Fragment>
    )
  }
}















export default App;