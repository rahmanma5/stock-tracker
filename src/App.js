import React from 'react';
import './App.css';
import Stock from './Stock'

function App() {
  class HelloMessage extends React.Component {
    constructor(props) {
      super(props);
      this.state = { modifier: "rounded" };
    }

    render() {
      return (
        <div className={this.state.modifier} onClick={() => this.state.modifier === "rounded" ? this.setState({modifier: "taller"}) : this.setState({modifier: "rounded"})}>
          Hello
        </div>
      );
    }
  }

  return (
    <div className="Home">
      <div className="row">
        <div className="oneRow">
          <HelloMessage/>
        </div>
        <div className="oneRow">
          <HelloMessage/>
        </div>
        <Stock></Stock>
      </div>
    </div>
  );
}

export default App;
