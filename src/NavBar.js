import React, { useState } from "react";
import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";
import Chitr from "./chitr.png";
function NavBar() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  // const [link, setLink] = useState("");
  const ref = firebase.firestore().collection("chitr");
  const time = Date().toLocaleString();
  const [fileUrl, setFileUrl] = useState(null);
  const [validate, setValidate] = useState(false);
  const [required, setRequired] = useState("");
  // adding post
  function addPost(newPost) {
    ref
      .doc(newPost.id)
      .set(newPost)
      .catch((err) => {
        console.error(err);
      });
  }

  // adding post

  const user = firebase.auth().currentUser;
  // validating my data
  function valid() { 
    if(name.trim()==="" || desc.trim()==="")
    {
        setRequired("Input Fields Required.");   
    }
    else{
      setValidate(true);
      setRequired("Chitr Uploaded");  
    }
   }
  function Post() {
    valid();
    if(validate)
 { 
    addPost({ name, desc,time,owner:user.uid, likes: 0,image:fileUrl, share: 0, id: uuidv4() });
  }
  else{
    console.log("Input Fields Required");
  }
}

// validating my data

  function Signout()
  {
    firebase.auth().signOut();

  }
  
// if (user !== null) {
//   // The user object has basic properties such as display name, email, etc.
//   const displayName = user.displayName;
  
//   const email = user.email;
//   console.log(email);
//   const photoURL = user.photoURL;
//   const emailVerified = user.emailVerified;

//   // The user's ID, unique to the Firebase project. Do NOT use
//   // this value to authenticate with your backend server, if
//   // you have one. Use User.getToken() instead.
//   const uid = user.uid;
// }
const  onFileChange= async (e)=> {
const file=e.target.files[0];
const storageRef=firebase.storage().ref()
const fileRef=storageRef.child(file.name)
await fileRef.put(file)
setFileUrl(await fileRef.getDownloadURL())
}

  return (
    <div>
      <nav class="navbar fixed-top navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand fw-bold" href="/">
            <img src={Chitr} alt="" width="50" height="50" />
          </a>
          <div class="btn-group" role="group">
            <a
              data-bs-toggle="collapse"
              href="#collapseinfo"
              role="button"
              aria-expanded="false"
              aria-controls="collapseinfo"
              class="btn btn-info"
            >
              Info <i class="fa fa-info" aria-hidden="true"></i>
            </a>
            <a
              class="btn btn-primary"
              data-bs-toggle="collapse"
              href="#collapsepost"
              role="button"
              aria-expanded="false"
              aria-controls="collapsepost"
            >
              Post <i class="fa fa-plus" aria-hidden="true"></i>
            </a>
            <a class="btn btn-danger" onClick={Signout}>
              LogOut <i class="fa fa-user" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        {/* collapse for info */}
        <div class="collapse" id="collapseinfo">
          <div class="card">
            <div class="card-body fw-bold">
              <img
                src="https://images.unsplash.com/photo-1506452819137-0422416856b8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGRldmVsb3BlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=332&q=60"
                class="rounded mx-auto d-block"
                alt="..."
              />
              Created by Ishu Kumar.
              


            </div>
          </div>
        </div>
        {/* modal to add post */}
        <div class="collapse" id="collapsepost">
          <div class="card card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <h3>{required}</h3>
              <input
                type="text"
                placeholder="Your Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              ></input>
              {/* <input
                type="text"
                placeholder="Add Link of Image"
                class="mt-3"
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                required
              ></input> */}
              <input type="file" onChange={onFileChange} placeholder="Upload"></input>
              <input
                type="text"
                placeholder="Add Description"
                class="mt-3"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                required
              ></input>
              
              <div class="buttons">
                
                <button type="reset" class="mt-3  btn bg-danger ms-2">
                  Reset
                </button>
                &nbsp;
                <button class="mt-3  btn bg-primary " onClick={Post}>
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
      <br></br>
    </div>
  );
}

export default NavBar;
