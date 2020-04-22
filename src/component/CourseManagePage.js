import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourseFromApi, saveCourse } from "../redux/action/courseAction";
import { loadAuthorApi } from "../redux/action/authorAction";
import { newCourse } from "../mockData";
import CourseForm from "./CourseForm";

function CourseManagePage({
  courses,
  authors,
  actionLoadCourses,
  actionLoadAuthors,
  actionSaveCourse,
  history,
  ...props
}) {
  console.log("new course - 1>>", props);
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setError] = useState({});

  useEffect(() => {
    //  destructure

    // return promise
    if (courses.length === 0) {
      actionLoadCourses().catch((error) => {
        alert("loading course failed !!", error);
      });
    } else {
      setCourse({ ...props.course });
    }
    if (authors.length === 0) {
      actionLoadAuthors().catch((error) => {
        alert("loading author failed !!", error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((preCourse) => ({
      ...preCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    actionSaveCourse(course).then(() => {
      history.push("/courses");
    });
  }

  return (
    <div>
      <h1>Manage Course</h1>
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
      />
    </div>
  );
}

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}
/**
 * 
 *  "ownProps" this lets us access the component's props. 
    we can use this to read the URL data injected on props by REACT Router
 */
const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  // debugger;
  const getCourse =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    // "newCourse" is empty object
    course: getCourse,
    courses: state.courses,
    authors: state.authors,
  };
};
// another way on declare actions
const mapDispatchToProps = {
  actionLoadCourses: loadCourseFromApi,
  actionLoadAuthors: loadAuthorApi,
  actionSaveCourse: saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseManagePage);
