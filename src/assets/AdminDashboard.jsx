import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AdminDashboard() {
  const params = useParams();
  const id = params.id;
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState();
  const [imageLink,setImageLink] = useState("");
  const [publish, setPublished] = useState(false);

  useEffect(()=>{
   async function getData(){
      const data = await fetch("http://localhost:3000/admin/courses",{
        method : "GET",
        mode : "cors",
        headers: { "Content-type" : "application/json" ,
          "token" : token
        },
      })
      const courses = await data.json();
      setCourses(courses);
      if(data.status != 200){
        console.error("Couldn't fetch courses");
      }
      else{
        
      }
    };
    getData();
  async function addCourses(){
    const course = await fetch("https://localhost:3000/addCourses",{
      method : "POST",
      mode :"cors",
      headers:{"Content-type" : "application/json",
        "token" : token
      },
      body : {
        "title" : title,
        "description" : description,
        "price" : price,
        "imageLink" : imageLink,
        "publish" : publish
      }
    })
    const resp = await course.json();
    if(resp.status != 200){
      console.error("Course couldn't be added");
    } else{
      console.log("Course successfully added");
    }
  }
  },[])
  return (
    <>
      Admin Dashboard : {id}
      <div style={{ paddingLeft: 20, paddingTop: 20 }}>
        <Typography variant="h5">MY COURSES</Typography>
      </div>
      <div>
        <RenderAddCourse/>
      </div>

    </>
  );
}

const RenderAddCourse = ()=>{
  return(
    <>
    <div class="course-input-box">
        <h2>Add New Course</h2>
        <form>
            <div class="input-group">
                <label for="title">Course Title</label>
                <input type="text" id="title" name="title" placeholder="Enter course title" 
                onChange={(e)=>{
                  setTitle(e.target.value);
                }}
                required/>
            </div>
            <div class="input-group">
                <label for="description">Course Description</label>
                <textarea id="description" name="description" placeholder="Enter course description" 
                onChange={(e)=>{
                  setDescription(e.target.value);
                }}
                required></textarea>
            </div>
            <div class="input-group">
                <label for="price">Course Price</label>
                <input type="number" id="price" name="price" placeholder="Enter course price"
                onChange={(e)=>{
                  setPrice(e.target.value);
                }}
                required/>
            </div>
            <div class="input-group">
                <label for="imageLink">Image Link</label>
                <input type="url" id="imageLink" name="imageLink" placeholder="Enter image link"
                onChange={(e)=>{
                  setImageLink(e.target.value);
                }}
                required/>
            </div>
            <button type="submit"
            onClick={()=>{
              addCourses();
            }}>Add Course</button>
        </form>
    </div>
    </>
  )
}