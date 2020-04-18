import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as courseAction from '../redux/action/courseAction'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
// added code 15-apr-2020
import CourseList from './CourseList'
import * as authorAction from '../redux/action/authorAction'
class Course extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course: {
                title: ''
            }
        };
    }

    componentDidMount() {
        // return promise
        if (this.props.courses.length === 0) {
            this.props.actions.loadCourses.loadCourseFromApi().catch((error) => {
                alert('loading course failed !!', error);
            });
        }
        if (this.props.authors.length === 0) {
            this.props.actions.loadAuthors().catch((error) => {
                alert('loading author failed !!', error);
            });

        }


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
        // this.props.dispatch(createCourse(this.state.course));
        // *** disptch action with bindActionCreators
        this.props.actions.createCourse(this.state.course);
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

                <CourseList courses={this.props.courses} authors={this.props.authors} />

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps >>', state);
    return {
        courses: state.authors.length === 0 ? [] : state.courses.map(course => {
            return {
                ...course,
                authorName: state.authors.find(author => author.id === course.authorId).name //combine 2 api data
            }
        }),
        authors: state.authors
    }
}
/**
 ***** single creation action options
 *  const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(courseAction, dispatch)
    }
}
 * 
 */
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            loadCourses: bindActionCreators(courseAction, dispatch),
            loadAuthors: bindActionCreators(authorAction.loadAuthorApi, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);