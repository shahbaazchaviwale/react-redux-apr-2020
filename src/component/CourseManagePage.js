import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourseFromApi, saveCourse } from "../redux/action/courseAction";
import { loadAuthorApi } from "../redux/action/authorAction";
import { newCourse } from "../mockData";
import CourseForm from "./CourseForm";
// added code 22-apr-2020
import Spinner from "./common/Spinner";
import { toast } from "react-toastify";

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
  // added code 22-apr-2020
  const [saving, setSaving] = useState(false);

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

  // added code 28-apr-2020
  function formValidation() {
    const { title, authorId, category } = course;
    console.log("course >>", course);
    const error = {};
    if (!title) error.title = "Please enter title !";
    if (!authorId) error.author = "Please enter author !";
    if (!category) error.category = "Please enter category !";
    // set hooks
    setError(error);
    console.log("error >>", error);
    // check length of Error
    return Object.keys(error).length === 0;
  }
  function handleSave(event) {
    event.preventDefault();
    // if validation has error "return" stop execution
    if (!formValidation()) return;
    // added code 22-apr-2020
    setSaving(true);
    actionSaveCourse(course)
      .then(() => {
        // added code 22-apr-2020
        toast.success("course added!!");
        history.push("/courses");
      })
      .catch((error) => {
        // handle error here from api
        // added code 28-apr-2020
        setSaving(false);
        setError({ onSave: error.message });
      });
  }

  // added code 22-apr-2020
  return courses.length === 0 || authors.length === 0 ? (
    <Spinner />
  ) : (
    <div>
      <h1>Manage Course</h1>
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
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
