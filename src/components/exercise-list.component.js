import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { ListGroup, Badge, Button } from "react-bootstrap"

export default class ExercisesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exercises: []
        }
        this.testId = this.testId.bind(this)
        this.exerciseDelete = this.exerciseDelete.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        exercises: res.data.map(item => item)
                    })
                }
            })
            .catch(err => console.log(err))
    }


    testId(id) {
        axios.get('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    exerciseDelete(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        this.setState({
            exercises: this.state.exercises.filter(item => item._id !== id)
        })
    }

    render() {
        return (
            <ListGroup as="ol" numbered>
                {
                    this.state.exercises.map(item => {
                        return (
                            <ListGroup.Item key={item._id}
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{item.username}</div>
                                    {item.description}
                                </div>
                                <Badge variant="primary" pill>
                                    duration: {item.duration}
                                </Badge>
                                <Badge variant="primary" pill>
                                    date: {item.date.substring(0,10)}
                                </Badge>

                                <Button variant="link">
                                    <Link to={'/edit/' + item._id}>edit</Link>
                                </Button>
                                <Button onClick={() => this.exerciseDelete(item._id)} variant="danger">delete</Button>
                            </ListGroup.Item>
                        )
                    })
                }

            </ListGroup>
        )
    }
}