import axios from "axios"
import React, { Component } from "react"
import { Form, Button } from "react-bootstrap"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker'

export default class EditExercise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeDuration = this.onChangeDuration.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)

        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/exercises/${this.props.match.params.id}`)
            .then(exercise => {
                this.setState({
                    username: exercise.data.username,
                    description: exercise.data.description,
                    duration: exercise.data.duration,
                    date: new Date(exercise.data.date)
                })
            })
            .catch(err => console.log(err))

        axios.get('http://localhost:5000/users')
            .then(res => {
                this.setState({
                    users: res.data.map(item => item.username)
                })
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault()
        axios.post(`http://localhost:5000/exercises/update/${this.props.match.params.id}`, this.state)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        window.location = '/'
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Select onChange={this.onChangeUsername} value={this.state.username}>
                    {
                        this.state.users.map((item, i) => {
                            return <option key={i} value={item}>{item}</option>
                        })
                    }
                </Form.Select>
                <br />
                <Form.Control type="text" placeholder="Description" onChange={this.onChangeDescription} value={this.state.description} />
                <br />
                <Form.Control type="text" placeholder="Duration" onChange={this.onChangeDuration} value={this.state.duration} />
                <br />
                <DatePicker selected={this.state.date} onChange={this.onChangeDate} value={this.state.date} />
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}