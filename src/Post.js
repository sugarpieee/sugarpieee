import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import "./post.css";

function Post() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const ref = firebase.firestore().collection("chitr");
  const curruser = firebase.auth().currentUser;
 

  function getUsers() {
    setLoading(true);
    ref.onSnapshot((Snap) => {
      setPost(Snap.docs.map((doc) => doc.data()));
      setLoading(false);
    });
  }
  function DelUser(newUser)
  {
    
    // ref
    // .where('owner', '==',curruser.uid).get().then((snapshot)=>{
    //   snapshot
    //   .doc(newUser.id)
    //   .delete()
    //   .catch((e)=>{
    //     console.error(e);
    //   })
    // });

    ref.where('owner', '==',curruser.uid).where('id','==',newUser.id)
.get()
.then(querySnapshot => {
  querySnapshot.forEach((doc) => {
    doc.ref.delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  });
})
.catch(function(error) {
  console.log("Error getting documents: ", error);
});
  
  }
   // adding likes
   function addLikes(newlike){
    ref
    .doc(newlike.id)
    .update(newlike)
    .catch((err)=>{
        console.error(err);
    });
    
}
// adding likes
function shareCount(AddShare)
{ 
  ref
  .doc(AddShare.id)
  .update(AddShare)
  .catch((err)=>{
    console.error(err);
});
}

  
  useEffect(() => {
    getUsers();
  }, []);
  // eslint-disable-next-line
  if (loading) {
    return (
      <div>
        <header className="loader">
          <h1>Loading.....</h1>
        </header>
      </div>
    );
  } 
  if(post == "")
  {
    return (
      <div>
        <header className="loader">
          <h1>Nothing to Show...</h1>
          <p>Be the First one to Upload ;)</p>
        </header>
      </div>
    );
  }
  return (
    <div>
      <br />

      {post.map((user) => (
        <div key={user.id} class="col-lg 3 col-md-3 col-sm-12 col-xs-12 ">
          <div class=" post card mt-2 col-md-12 pt-4 shadow-lg">
            {/* UserInfo ad delete icon */}
            <div class="row nav-user">
              <div class="col">
                <a href="/" class="card-subtitle text-bold float-left view_btn">
                  <span class="badge bg-primary">{user.name} </span>
                </a>
              </div>
              <div class="col">
                <a  onClick={()=> DelUser(user)}><i class="fas fa-trash" ></i></a>
              </div>
            </div>
            {/* UserInfo ad delete icon */}
            {/* Post body  */}
            <div class="card-body">
              {/* <h3 class="card-title ml-auto">
              <i class="fas fa-chevron-right"></i>ishu03
            </h3> */}
              <div class="card-body p-0 fw-bold">
                <img
                  src={user.image}
                  alt="Chitr Not Uploaded"
                  class="rounded w-500 card-img-top"
                />
                <p>{user.desc}</p>
                
              </div>
              <p class="h5 show-read-more font-weight-bold "></p>

              <span class="Countlikes font-weight-bold" onClick={()=>addLikes({likes:user.likes+1,id:user.id})}>
                <i class="fas fa-heart like-btn "></i>
                &nbsp;
                {user.likes}
              </span>
              <span class="Countcomment font-weight-bold">
                <i class="far fa-comment"></i>
                &nbsp;
                {user.comments}
              </span>
              <span>
              
              <a href={`https://api.whatsapp.com/send?text=${user.link}`} onClick={()=>shareCount({share:user.share+1,id:user.id})}><i class="fas fa-share"></i>
              </a>

              &nbsp;
                {user.share}
              </span>
            </div>
            {/* Post body  */}
          </div>
        </div>
      ))}
      
    </div>
  );
}

export default Post;
