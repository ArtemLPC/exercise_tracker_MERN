import React, { Component } from "react"
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'

export default class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        // console.log(this.state)
        axios.post('http://localhost:5000/users/add', this.state)
            .then(res => console.log(res))

        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Control value={this.state.username} onChange={this.onChangeUsername} type="text" placeholder="Username" />
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}