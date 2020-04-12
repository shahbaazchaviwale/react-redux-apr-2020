import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createCourse } from '../redux/action/courseAction'
import PropTypes from 'prop-types';

class Course extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course: {
                title: ''
            }
        };
    }

    handleInput = (event) => {
        /**
         * copy state & update => {...this.state.course, title: event.target.value }
         */
        const tempCourse = { ...this.state.course, title: event.target.value }
        this.setState({ course: tempCourse });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // debugger
        this.props.dispatch(createCourse(this.state.course));
        const tempCourse = { ...this.state.course, title: '' }
        this.setState({ course: tempCourse }, console.log('state >>', this.state));

    }

    render() {
        return (
            <div>
                <h1>
                    Course
                </h1>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input type="text" onChange={(e) => this.handleInput(e)} value={this.state.course.title} />
                    <button type="submit" value="Add" >Add</button>
                </form>

                {this.props.courses.map((course, i) => {
                    return <div key={i}> {course.title} </div>
                })
                }

            </div>
        )
    }
}

// Course.PropTypes = {
//     courses: PropTypes.array.isRequired,
//     dispatch: PropTypes.func.isRequired
// }
const mapStateToProps = (state) => {
    return {
        courses: state.courses
    }
}

export default connect(mapStateToProps)(Course);