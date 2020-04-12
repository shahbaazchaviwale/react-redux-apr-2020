/**
 * ====================================================
 * set dispatch as bindActionCreators
 * ==================================================== 
 */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createCourse } from '../redux/action/courseAction'
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux'
import { ACTION_TYPE } from './constant/constant-type';

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
        // debugger;
        // ---------------------- another dispatch -1--------------------
        /**
         *  "addActionFunctionName" is not actual function name
         *  "passParametersForAction" is not actual parameter name
         */

        this.props.actions.addActionFunctionName(passParametersForAction);
        // --------------------------------------------------------------
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

// ----------------------get store state----------------------
const mapStateToProps = (state) => {
    // debugger;
    return {
        courses: state.courses
    }
}
// ----------------------dispatch action----------------------
const mapDispatchToProps = (dispatch) => {
    // "passActionObject" is not actual object name
    actions: bindActionCreators(passActionObject, dispatch)
}
// ------------------------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(Course);