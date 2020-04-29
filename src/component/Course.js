import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseAction from "../redux/action/courseAction";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
// added code 15-apr-2020
import CourseList from "./CourseList";
import * as authorAction from "../redux/action/authorAction";
import { Redirect } from "react-router-dom";
// added code 22-apr-2020
import Spinner from "./common/Spinner";
import { toast } from "react-toastify";
class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToAddCoursePage: false,
    };
  }

  componentDidMount() {
    // return promise
    if (this.props.courses.length === 0) {
      this.props.actions.loadCourses.loadCourseFromApi().catch((error) => {
        alert("loading course failed !!", error);
      });
    }
    if (this.props.authors.length === 0) {
      this.props.actions.loadAuthors().catch((error) => {
        alert("loading author failed !!", error);
      });
    }
  }
  handleInput = (event) => {
    /**
     * copy state & update => {...this.state.course, title: event.target.value }
     */
    const tempCourse = { ...this.state.course, title: event.target.value };
    this.setState({ course: tempCourse });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // debugger
    // this.props.dispatch(createCourse(this.state.course));
    // *** disptch action with bindActionCreators
    this.props.actions.createCourse(this.state.course);
    const tempCourse = { ...this.state.course, title: "" };
    this.setState({ course: tempCourse }, console.log("state >>", this.state));
  };
  // added code 28-apr-2020
  handleDeleteCourse = (course) => {
    toast.success("Course Deleted !!");
    this.props.actions.deleteCourse(course).catch((error) => {
      toast.error("Delete Failed !!" + error.message, { autoClose: false });
    });
  };
  render() {
    // added code 22-apr-2020
    return this.props.loading ? (
      <Spinner />
    ) : (
      <div className="container">
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h1>Course</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            this.setState({ redirectToAddCoursePage: true });
          }}
        >
          Add Course
        </button>
        <CourseList
          courses={this.props.courses}
          authors={this.props.authors}
          onDeleteClick={this.handleDeleteCourse}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps >>", state);
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find(
                (author) => author.id === course.authorId
              ).name, //combine 2 api data
            };
          }),
    authors: state.authors,
    // added code 22-apr-2020
    loading: state.apiLoadingStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseAction, dispatch),
      loadAuthors: bindActionCreators(authorAction.loadAuthorApi, dispatch),
      // added code 28-apr-2020
      deleteCourse: bindActionCreators(courseAction.deleteCourse, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);
