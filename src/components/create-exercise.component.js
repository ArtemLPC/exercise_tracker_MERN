import React, { Component } from "react"
import { Button, Form } from "react-bootstrap"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker'
import axios from "axios"

export default class CreateExercise extends Component {
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
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(item => item.username),
                        username: res.data[0].username
                    })
                }
            })
            .catch(err => console.log(err))
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

        axios.post('http://localhost:5000/exercises/add', this.state)
            .then(res => console.log(res.data))

        window.location = '/'
    }




    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Select onChange={this.onChangeUsername}>
                    {
                        this.state.users.map((item, i) => {
                            return <option key={i}>{item}</option>
                        })
                    }
                </Form.Select>
                <br />
                <Form.Control type="text" placeholder="Description" onChange={this.onChangeDescription} />
                <br />
                <Form.Control type="text" placeholder="Duration" onChange={this.onChangeDuration} />
                <br />
                <DatePicker selected={this.state.date} onChange={this.onChangeDate} />
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}