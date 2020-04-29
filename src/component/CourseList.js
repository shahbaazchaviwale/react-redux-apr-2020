import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

let data = [];
// added code 28-apr-2020  "onDeleteClick"
const CourseList = ({ courses, authors, onDeleteClick }) => (
  // added code 16-apr-2020
  /**
     * ==============combined 2 api data into 1 array===============
     *  data = courses.map((c) => {
        return {
            ...c,
            authName: authors.find(a => a.id === c.authorId).name
        }
    }),
    console.log('courses data >', data),
    * ============================================================= */

  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {courses.map((course) => {
        return (
          <tr key={course.id}>
            <td>
              <a
                className="btn btn-light"
                href={"http://pluralsight.com/courses/" + course.slug}
              >
                Watch
              </a>
            </td>
            <td>
              <Link to={"/course/" + course.slug}>{course.title}</Link>
            </td>
            <td>{course.authorName}</td>
            <td>{course.category}</td>
            <td>
              {/* // added code 28-apr-2020  "onDeleteClick"  */}
              <button
                className="btn btn-outliner-danger"
                onClick={() => onDeleteClick(course)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default CourseList;
