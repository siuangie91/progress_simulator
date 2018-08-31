import React, { Component, Fragment } from 'react';
import Buttons from './Buttons';
import Connections from './Connections';
import Progresses from './Progresses';

import { STATUSES, run, connections } from './connectionrunner';
import './App.css';


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
    // index of STATUS type can be thought of as a status ID
    // so create an array, count, whose indexes match those status IDs, 
    // and the values reflect the count of the status type at each index
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
    // create connection objects
    const cnxCollection = connections.map(connection => {
      return {
        id: connection.id,
        progress: 0,
        status: 0
      }
    });

    return cnxCollection;
  }

  // update the bar widths and progress label
  updateBars = (id, item, callback) => {
    const { progress, status } = item;
    
    const newCnxns = this.state.cnxns; // copy the cnxns from the state
    const thisNewCnxn = newCnxns.find(cnxn => cnxn.id === id); // find the connection with the passed in ID
    thisNewCnxn.progress = parseFloat(progress) * 100; // assign the new progress value in %
    thisNewCnxn.status = STATUSES.indexOf(status); // assign the new status as an index number (like a status ID)

    this.setState({ // update the state
      cnxns: newCnxns
    }, callback); // pass in a callback and not hardcode updateCount because you might change what callback later on
  }

  updateCount = () => {
    // create a new count array
    const newCounts = new Array(STATUSES.length).fill(0); // space cost too high? will have to create one for each cnxn everytime it's updated --> O(n * m) space (n = num types of status, m = num connections)
    const updatedCnxns = this.state.cnxns;

    // get counts using state.cnxns
    updatedCnxns.forEach(cnxn => {
      const cnxnStatus = cnxn.status;

      newCounts[cnxnStatus]++;
    });

    this.setState({
      count: newCounts
    }, this.checkDone); // should've passed in a callback instead, like in updateBars
  }

  checkDone = () => {
    if(this.state.count[STATUSES.length - 1] === connections.length) { // if the num of "connected" == num connections, then we're done!
      this.setState({
        done: true
      });
    }
  }

  start = () => {
    // disable the Start button
    this.setState({
      btnEnabled: false
    })

    // connect each connection
    connections.forEach(connection => {
      connection.run((item) => {
        this.updateBars(connection.id, item, this.updateCount);
      });
    })
  }

  reset = () => { // reset everything!
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

        <Buttons 
          btnEnabled={this.state.btnEnabled}
          done={this.state.done}
          start={this.start}
          reset={this.reset}/>

        <Connections count={this.state.count} />

        <Progresses cnxns={this.state.cnxns} />

      </Fragment>
    )
  }
}


export default App;