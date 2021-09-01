import React, { Fragment, useState } from "react";
import "./login.css";
import firebase from "./firebase";

function Authentication() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [required, setRequired] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [valid, setValid] = useState(false);
const [accNotFound, setAccNotFound] = useState('');
  // AccountNotFound

  function AccountNotFound()
  {
    setAccNotFound("Account Not Found");
  }


//   validate function to verify login
  function validate() {
    //   regx for validate email
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(mail);
    if(mail.trim()==="" || password.trim()==="")
    {
        setRequired("Both Field are Required.");   
    }
    else if (!result) {
      setEmail("Please enter Valid Mail-Id.");
    } else if (password.length < 5) {
      setPass("Please enter Password of 8 characters.");
    }
    else{
        setValid(true);
    }
    
  }

//   For LogIn
  function logmein() {
    //   calling validate function to verify mail and password
    // protocol to follow 
    setRequired('');
    setEmail('');
    setPass('');
    validate();
    // protocol to follow 
    if (valid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(mail, password)
        .then((userCredientials) => {
          // console.log(userCredientials);
        })
        .catch((error) => {
          // console.error(error);
          AccountNotFound();
          // ..
        });
    } 
  }
// For SignUp
  function signup() {
    // protocol to follow 
    setRequired('');
    setEmail('');
    setPass('');
    validate();
    // protocol to follow 
    if (valid) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(mail, password)
      .then((userCredientials) => {
        // console.log(userCredientials);
      })
    
      .catch((error) => {
        console.error(error);
        // ..
      });
    }
    
  }

  return (
    <Fragment>
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-2"></div>
          <div class="col-lg-6 col-md-8 login-box">
            <div class="col-lg-12 login-key">
              <i class="fa fa-user" aria-hidden="true"></i>
            </div>

            <div class="col-lg-12 login-form">
              <div class="col-lg-12 login-form">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                     <label class="form-control-label badge bg-danger text-white">{required}{accNotFound}</label>
                     <br/>
                  <label class="form-control-label badge bg-danger text-white">{email}</label>
                  <div class="form-group">
                    <label class="form-control-label">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      onChange={(e) => {
                        setMail(e.target.value);
                      }}
                    />
                  </div>
                  <label class="form-control-label badge bg-danger text-white">{pass}</label>
                  <div class="form-group">
                    <label class="form-control-label">PASSWORD</label>
                    <input
                      type="password"
                      class="form-control"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                     />
                  </div>

                  <div class="col-lg-12 loginbttm">
                    <div class="col-lg-6 login-btm login-text"></div>
                    <div class="col-lg-6 login-btm login-button">
                      <button type="submit" class="btn btn-outline-primary" onClick={logmein}>
                        Login
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <button type="submit" class="btn btn-outline-primary" onClick={signup}>
                        Signup
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Authentication;
