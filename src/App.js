import Navbar from "./NavBar";
import "./App.css";
import Posts from "./Post";
import React, {  Component } from "react";
import firebase from "./firebase";
import Login from './Authentication';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{}
    }
  }

  componentDidMount()
  {
    this.AuthListner();
  }
  AuthListner(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user});
      }
      else{
        this.setState({user:null});
      }
    })
  }


  render() {
    return (
      <div>
        {this.state.user ? (<div>
          <Navbar /><Posts />
        </div>):(<Login/>)}
        {/* </header> */}
        
      </div>
    );
  }
}

export default App;
