import React, { Component } from 'react';
import Select from 'react-select';
import { courses, getTimeSlot } from './api/api'

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fullname: '',
			email: '',
			contactNumber: '',
			childName: '',
			childAge: '',
			course: [],
			courseOptions: [],
			slot: [],
			trialOption: [],
			selectedOption: '',
			clearable: true,
		};

		this.update = this.update.bind(this);

	}
	componentDidMount() {
		courses()
			.then(resp => {
				this.setState({
					courseOptions: resp
				})
			})
	}

	// select trial course
	selectCourse = (value) => {
		let newstate = value.label
		this.setState({ course: newstate });
		getTimeSlot(newstate)
			.then(resp => {

				let dates = resp.map((val) => {
					let date = String(new Date(Number(val))).split('GMT')[0] + '(hrs)'
					return { label: date, value: val }

				})
				this.setState({
					trialOption: dates
				})
			})
	}

	thanks = () => { }



	update(e) {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}

	render() {

		this.state.courseOptions = this.state.courseOptions.map((val) => {
			return { label: val.course_name, value: val.course_name }

		})

		function thanks() {
			alert('Thank you for registration')
		}

		return (
			<div className="register">
				<form >
					<h2>Book a trial class</h2>

					<div className="name">
						<input
							type="text"
							placeholder="Full Name"
							name="fullname"
							value={this.state.fullname}
							onChange={this.update}
						/>
					</div>

					<div className="email">
						<input
							type="text"
							placeholder="Email"
							name="email"
							value={this.state.email}
							onChange={this.update}
						/>
					</div>

					<div className="contactNumber">
						<input
							type="text"
							placeholder="Contact number"
							name="contactNumber"
							value={this.state.contactNumber}
							onChange={this.update}
						/>
					</div>


					<div className="childName">
						<input
							type="text"
							placeholder="Child's Name"
							name="childName"
							value={this.state.childName}
							onChange={this.update}
						/>
					</div>


					<div className="childAge">
						<input
							type="text"
							placeholder="child's age"
							name="childAge"
							value={this.state.childAge}
							onChange={this.update}
						/>
					</div>


					<div className="course">
						<div className="label">Select course: </div>
						<Select
							name="course"
							onChange={this.selectCourse}
							clearable={this.state.clearable}
							searchable={this.state.searchable}
							options={this.state.courseOptions}
						/>
					</div>

					<div className="slot">
						<div className="label">Select slot: </div>

						<Select
							name="slot"
							clearable={this.state.clearable}
							searchable={this.state.searchable}
							options={this.state.trialOption}
						/>
					</div>



					<button onClick={thanks} >Confirm Booking </button>
				</form>

			</div>
		);
	}
}

export default Register;
