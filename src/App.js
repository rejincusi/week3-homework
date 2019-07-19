import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import ModelDetails from './components/ModelDetails';

class App extends Component {
  state = {
    selected: "",
    computers: [
      {
        name: "Ivel Z3",
        manufacturer: "Ivasim",
        year: 1969,
        origin: "Croatia"
      },
      {
        name: "Bally Astrocade",
        manufacturer: "Bally Consumer Products",
        year: 1977,
        origin: "USA"
      },
      {
        name: "Sord M200 Smart Home Computer",
        manufacturer: "Sord Computer Corporation",
        year: 1971,
        origin: "Japan"
      },
      {
        name: "Commodore 64",
        manufacturer: "Commodore",
        year: 1982,
        origin: "USA"
      }
    ]
  }

  updateSelection = (e) => {
    this.setState({
      selected: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    if (this.state.selected) {
      
      const computerDetail = this.state.computers.find(computer => 
        computer.name === this.state.selected)
      
      this.props.dispatch({
        type: 'ADD_LIST',
        payload: {
          id: Math.ceil(Math.random()*10000),
          name: computerDetail.name,
          manufacturer: computerDetail.manufacturer,
          year: computerDetail.year,
          origin: computerDetail.origin
        }
      })
    }
  }

  render() {
    const optionList = this.state.computers.map(computer =>
      <option
        key={computer.name}
        value={computer.name}>
        {computer.name} ({computer.year})
      </option>
    )
    const lists = this.props.lists.map(list => 
      <ModelDetails
        key={list.id} 
        name={list.name}
        manufacturer={list.manufacturer}
        year={list.year}
        origin={list.origin}
      />
    )
    return (
      <div className="App">
        { lists }
        <form onSubmit={this.handleSubmit.bind(this)}>
          <select
            onChange={this.updateSelection}
            value={this.state.selected}>
            <option value="">-- pick a model --</option>
            { optionList }
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state
  }
}

export default connect(mapStateToProps)(App);
