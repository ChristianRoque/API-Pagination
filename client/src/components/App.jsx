import React, { Component } from 'react';
import axios from 'axios';
// import { Route, Link, NavLink, Switch } from 'react-router-dom';

export default class App extends Component {
	state = {
		params: { range: { by: 'id' } }
	};

	componentDidMount = () => {
		axios.post('http://localhost:5000/apps', this.state.params).then((result) => {
			this.setState({
				data: result.data
			});
		});
	};

	handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	dataDisplay = () => {
		console.log(this.state.data);
		let display = this.state.data.map((value, i) => {
			return (
				<div key={i} className="result">
					<div>
						<img
							className="appPicture"
							src="https://images.idgesg.net/images/article/2019/07/ios13-app-store-hero-100802526-large.jpg"
						/>
					</div>
					<div>
						<p>{value.name}</p>
					</div>
				</div>
			);
		});
		this.setState({
			render: display
		});
	};

	render() {
		if (!this.state.data) {
			return <div>Loading</div>;
		}
		return (
			<div className="App">
				<div>
					<input onChange={this.handleInputChange} name="by" placeholder="Order by" />
					<button onClick={this.dataDisplay}> Render Results</button>
				</div>
				<div className="resultContainer"> {this.state.render} </div>
			</div>
		);
	}
}
