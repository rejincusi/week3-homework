import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    addedList: [],
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

  handleChange = (e) => {
    this.setState({ selected: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const computerDetail = this.state.computers.find(computer => computer.name === this.state.selected)
    if (this.state.selected) {
      this.setState({ addedList: [...this.state.addedList, computerDetail] })
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
    const lists = this.state.addedList.map(list => 
      <ul>
        <li>Name: {list.name}</li>
        <li>Manufacturer: {list.manufacturer}</li>
        <li>Year: {list.year}</li>
        <li>Origin: {list.origin}</li>
      </ul>
    )
    return (
      <div className="App">
        <div className="added-list">
          { lists }
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <select
            name="computer"
            onChange={this.handleChange}
            value={this.state.selected}>
            <option value="">-- pick a model --</option>
            {optionList}
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default App;
