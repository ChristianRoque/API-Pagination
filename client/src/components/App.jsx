import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Link, NavLink, Switch } from 'react-router-dom';

export default class App extends Component {
	state = {};

	componentDidMount = () => {
		axios.post('http://localhost:5000/apps', { range: { by: 'id', start: 1, max: 10 } }).then((result) => {
			this.setState({
				data: result
			});
		});
	};

	dataDisplay = () => {
		this.state.data.map((hell) => {
			console.log(hell);
		});
		return <div>This loaded.</div>;
	};

	render() {
		if (!this.state.data) {
			return <div>Loading</div>;
		}
		return (
			<div className="App">
				HERE WE GO
				{this.dataDisplay()}
			</div>
		);
	}
}
