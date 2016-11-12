import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
const server = 'https://api-language-roundup-python.herokuapp.com/donuts';
var App = React.createClass({
  getInitialState() {
    return {
      name: '',
      topping: '',
      price: 0,
      donuts: [],
      edit_id: '',
      edit_name: '',
      edit_topping: '',
      edit_price: 0,
      delete_id: '',
    };
  },
  render() {
    return (
      <div>
        <h1>Create Donut</h1>
        <input onChange={this.nameCatcher} type="text" />
        <input onChange={this.toppingCatcher} type="text" />
        <button onClick={this.createDonut}>Create Donut</button>
        <br></br>
        <br></br>
        <h1>Read Donuts</h1>
        <button onClick={this.readDonuts}>Read Donuts</button>
        {this.state.donuts.map( (value, index) => {
          return (
            <p key={index}>{value.name} {value.topping}</p>
          );
        })}
        <br></br>
        <br></br>
        <h1>Update Donut</h1>
        <input onChange={this.edit_idCatcher} type="text" />
        <input onChange={this.edit_nameCatcher} type="text" />
        <input onChange={this.edit_toppingCatcher} type="text" />
        <button onClick={this.updateDonut}>Update Donut</button>
        <br></br>
        <br></br>
        <h1>Delete Donut</h1>
        <input onChange={this.delete_idCatcher} type="text" />
        <button onClick={this.deleteDonut}>Delete Donut</button>
      </div>
    );
  },
  nameCatcher(event) {
    this.setState({
      name: event.target.value
    });
  },
  toppingCatcher(event) {
    this.setState({
      topping: event.target.value
    });
  },
  priceCatcher(event) {
    this.setState({
      price: event.target.value
    });
  },
  createDonut() {
    var donut = {name: this.state.name, topping: this.state.topping};
    axios({
      method: 'POST',
      url: `${server}`,
      data: donut
    });
  },
  readDonuts() {
    axios({
      method: 'GET',
      url: `${server}`
    }).then(r => {
      this.setState({
        donuts: r.data
      });
    });
  },
  edit_idCatcher(event) {
    this.setState({
      edit_id: event.target.value
    });
  },
  edit_nameCatcher(event) {
    this.setState({
      edit_name: event.target.value
    });
  },
  edit_toppingCatcher(event) {
    this.setState({
      edit_topping: event.target.value
    });
  },
  edit_priceCatcher(event) {
    this.setState({
      edit_price: event.target.value
    });
  },
  updateDonut() {
    var donut = {
      id: this.state.edit_id,
      name: this.state.edit_name,
      topping: this.state.edit_topping,
      price: this.state.edit_price
    };

    axios({
      method: 'PUT',
      url: `${server}`,
      data: donut
    });
  },
  delete_idCatcher(event) {
    this.setState({
      delete_id: event.target.value
    });
  },
  deleteDonut() {
    axios({
      method: 'DELETE',
      url: `${server}/${this.state.deleteId}`
    });
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
