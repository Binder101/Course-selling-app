import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CustomStyledComponents/addCourse.css";
import "./CustomStyledComponents/courseDisplay.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

export default function AdminDashboard() {
  const params = useParams();
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [imageLink, setImageLink] = useState("");
  const [publish, setPublished] = useState(false);
  const [addCourse, setAddCourse] = useState(false);
  const [updateCourse, setUpdateCourse] = useState(false);
  const [courseID, setCourseID] = useState("");

  useEffect(() => {
    async function getData() {
      const data = await fetch("http://localhost:3000/admin/courses", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const courses = await data.json();
      setCourses(courses);
      if (data.status != 200) {
        console.error("Couldn't fetch courses");
      }
    }
    getData();

    async function addCourses() {
      const course = await fetch("http://localhost:3000/admin/courses", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          price: price,
          imageLink: imageLink,
          published: publish,
        }),
      });
      const resp = await course.json();
      if (resp.status != 200) {
        console.error("Course couldn't be added");
      } else {
        console.log("Course successfully added");
      }
      setAddCourse(false);
    }
    if (addCourse) addCourses();

    async function update() {
      const id = courseID;
      console.log(id);
      const course = await fetch(`http://localhost:3000/admin/courses/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          price: price,
          imageLink: imageLink,
          published: publish,
        }),
      });
      const resp = await course.json();
      if (course.status == 200) {
        console.log("Course successfully updated");
      }
      setUpdateCourse(false);
      console.log("Update removed");
    }
    if (updateCourse) update();
  }, [title, description, price, imageLink, publish, updateCourse]);
  return (
    <>
      <div style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 20 }}>
        <h2>MY COURSES</h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {courses.map((course) => {
          return (
            <RenderCourse
              course={course}
              publish={publish}
              setPublished={setPublished}
              setUpdateCourse={setUpdateCourse}
              setCourseID={setCourseID}
              setTitle = {setTitle}
              setDescription =  {setDescription}
              setImageLink = {setImageLink}
              setPrice = {setPrice}
            />
          );
        })}
      </div>
      <div>
        <RenderAddCourse
          setAddCourse={setAddCourse}
          setTitle={setTitle}
          setDescription={setDescription}
          setPrice={setPrice}
          setImageLink={setImageLink}
        />
      </div>
    </>
  );
}
const RenderCourse = (props) => {
  const togglePublishStatus = () => {
    props.setPublished(!props.publish);
    props.setCourseID(props.course._id);
    props.setTitle(props.course.title);
    props.setDescription(props.course.description);
    props.setImageLink(props.course.imageLink);
    props.setPrice(props.course.price);
    props.setUpdateCourse(true);
  };
  return (
    <>
      <div class="course-card">
        <img
          src={props.course.imageLink}
          alt="Course Image"
          class="course-image"
        />
        <div class="course-content">
          <h2 class="course-title">{props.course.title}</h2>
          <p class="course-description">{props.course.description}</p>
          <div class="course-info">
            <span class="course-price">
              <CurrencyRupeeIcon />
              {props.course.price}
            </span>
            <button
              className={`course-status ${
                props.course.published ? "published" : "unpublished"
              }`}
              onClick={togglePublishStatus}
            >
              {props.course.published ? "Published" : "Unpublished"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const RenderAddCourse = (props) => {
  return (
    <>
      <div class="course-input-box">
        <h2>Add New Course</h2>
        <form>
          <div class="input-group">
            <label for="title">Course Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter course title"
              onChange={(e) => {
                props.setTitle(e.target.value);
              }}
              required
            />
          </div>
          <div class="input-group">
            <label for="description">Course Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter course description"
              onChange={(e) => {
                props.setDescription(e.target.value);
              }}
              required
            ></textarea>
          </div>
          <div class="input-group">
            <label for="price">Course Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter course price"
              onChange={(e) => {
                props.setPrice(e.target.value);
              }}
              required
            />
          </div>
          <div class="input-group">
            <label for="imageLink">Image Link</label>
            <input
              type="url"
              id="imageLink"
              name="imageLink"
              placeholder="Enter image link"
              onChange={(e) => {
                props.setImageLink(e.target.value);
              }}
              required
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              props.setAddCourse(true);
            }}
          >
            Add Course
          </button>
        </form>
      </div>
    </>
  );
};
